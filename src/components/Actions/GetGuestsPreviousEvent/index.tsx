import { useFlower, useFlowerForm } from '@flowerforce/flower-react'
import { useCallback, useEffect } from 'react'
import { LoadingView } from '@/components/LoadingView'
import { useRealmAuth } from '@/hooks/useRealmAuth'
import { useModalManager } from '@/hooks/useModalManager'
import { MAXGUEST_ERROR } from '@/constants/modals'
import { Guest } from '@/model/Events'

export const GetGuestsPreviousEvent = () => {
  const { back } = useFlower()
  const { getData, setData } = useFlowerForm()
  const { currentUser } = useRealmAuth()
  const { openModal } = useModalManager(MAXGUEST_ERROR)
  const prevReservations = getData('prevReservations')

  const tempGuests = getData('tempGuests')
  const maxGuests = getData('maxGuests')
  const spacesEventPartner = getData(`event.partners.${currentUser?.partnerId}.spaces`)

  const getGuestsList = useCallback(async () => {
    try {
      const mappedPrevReservations = prevReservations
        .filter(
          (guest: Guest) =>
            !tempGuests?.some(
              (tempGuest: Guest) =>
                tempGuest.firstName === guest.firstName &&
                tempGuest.lastName === guest.lastName &&
                tempGuest.birthDate === guest.birthDate,
            ),
        )
        .map((guest: Guest) => {
          return {
            firstName: guest.firstName,
            lastName: guest.lastName,
            birthDate: guest.birthDate,
            email: guest.email,
            spaceId: spacesEventPartner[guest.spaceId] ? guest.spaceId : '',
          }
        })

      const spreadGuests = prevReservations
        ? [...(tempGuests || []), ...mappedPrevReservations]
        : tempGuests

      if (spreadGuests.length > maxGuests) {
        openModal()
      }
      setData(spreadGuests, 'tempGuests')
    } catch (e) {
      console.log('error GetGuestsPreviousEvent - ', e)
    } finally {
      return back()
    }
  }, [
    prevReservations,
    tempGuests,
    maxGuests,
    setData,
    spacesEventPartner,
    openModal,
    back,
  ])

  useEffect(() => {
    getGuestsList()
  }, [getGuestsList])
  return <LoadingView />
}
