import { useFlower, useFlowerForm } from '@flowerforce/flower-react'
import React, { useCallback, useEffect } from 'react'
import { getEventReservationByPartner } from '@/api/getEventReservationByPartner'
import { getPrevEventsByPartner } from '@/api/getEventsByPartner'
import { LoadingView } from '@/components/LoadingView'
import { useRealmAuth } from '@/hooks/useRealmAuth'

const GetPreviousEventData = () => {
  const { currentUser } = useRealmAuth()
  const partnerId: string = currentUser!.partnerId
  const { setData, getData } = useFlowerForm()

  const eventId = getData('event.id')

  const { next } = useFlower()

  const getPrevEventData = useCallback(async () => {
    try {
      const previousEventId = await getPrevEventsByPartner(eventId)
      const prevReservations =
        previousEventId &&
        (await getEventReservationByPartner(previousEventId, partnerId))

      setData(prevReservations, 'prevReservations')
    } catch (e) {
      console.log(e)
    } finally {
      next()
    }
  }, [eventId, partnerId, setData, next])

  useEffect(() => {
    getPrevEventData()
  })

  return <LoadingView />
}

export default GetPreviousEventData
