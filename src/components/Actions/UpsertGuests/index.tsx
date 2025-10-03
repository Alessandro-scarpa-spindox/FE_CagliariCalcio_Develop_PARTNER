import React, { useCallback, useEffect } from 'react'
import { useFlower, useFlowerForm } from '@flowerforce/flower-react'
import dayjs from 'dayjs'
import { upsertReservation } from '@/api/upsertReservation'
import { LoadingView } from '@/components/LoadingView'
import { useRealmAuth } from '@/hooks/useRealmAuth'
import { Guest } from '@/model/Events'
import { nanoid } from 'nanoid'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { getEventReservationByPartner } from '@/api/getEventReservationByPartner'
import { getSubscribersTotal } from '@/api/checkSubscribersTotal'
import { deleteReservations } from '@/api/deleteReservations'

dayjs.extend(customParseFormat)

type GuestCheck = {
  guests: Guest[]
  total: number
}
const UpsertGuests = () => {
  const { back, next, restart } = useFlower()
  const { getData, setData } = useFlowerForm()
  const { currentUser } = useRealmAuth()

  const onUpsertGuests = useCallback(async () => {
    const eventId = getData('event.id')

    try {
      if (currentUser) {
        const initialGuests = await getEventReservationByPartner(
          eventId,
          currentUser.partnerId,
        )
        const stateGuests: Guest[] = getData('event.guests')
        const maxGuests = await getSubscribersTotal(eventId, currentUser.partnerId)

        const tempGuests = getData('tempGuests')

        const qrCodes = initialGuests.map(({ qrcode }) => qrcode)

        const guestsToBeDeleted = stateGuests?.filter(({ id: guestId }) => {
          return !tempGuests.some(({ id }: Guest) => id === guestId)
        })

        if (guestsToBeDeleted?.length > 0) {
          await deleteReservations(guestsToBeDeleted)
        }

        const filteredGuests = tempGuests?.reduce(
          (acc: GuestCheck, guest: Guest) => {
            const { id, ...rest } = guest

            const qrcode = guest.qrcode || nanoId(qrCodes)

            const currentGuest: Guest = {
              ...rest,
              id,
              qrcode,
              birthDate: dayjs(guest.birthDate, 'DD/MM/YYYY').toDate(),
            }

            if (initialGuests.some(({ id }) => id === guest.id)) {
              return { ...acc, guests: [...acc['guests'], currentGuest] }
            }

            return { guests: [...acc['guests'], currentGuest], total: acc.total + 1 }
          },
          {
            guests: [],
            total: initialGuests.length - guestsToBeDeleted.length,
          },
        )

        if (filteredGuests.total > maxGuests) {
          return next('onMaxGuestsError')
        }

        await upsertReservation(eventId, currentUser.partnerId, filteredGuests.guests)

        setData(filteredGuests.guests, 'event.guests')

        restart()
      }
    } catch (e) {
      next('onError')
    }
  }, [getData, setData, next, back, currentUser, restart])

  useEffect(() => {
    onUpsertGuests()
  }, [onUpsertGuests])

  return <LoadingView />
}

export default UpsertGuests

function nanoId(excludedString?: string[]) {
  const newId = nanoid(7)

  if (excludedString?.includes(newId)) {
    return nanoId(excludedString)
  }

  return newId
}
