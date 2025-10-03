import { useFlower, useFlowerForm } from '@flowerforce/flower-react'
import { useCallback, useEffect } from 'react'
import dayjs from 'dayjs'
import Toast from 'react-native-toast-message'
import { LoadingView } from '@/components/LoadingView'
import { getEventReservationByPartner } from '@/api/getEventReservationByPartner'
import { useRealmAuth } from '@/hooks/useRealmAuth'

export const GetEventReservationsByPartner = () => {
  const { next, back } = useFlower()
  const { getData, setData } = useFlowerForm()
  const { currentUser } = useRealmAuth()
  const eventDate = dayjs(getData('event.date'))
  const isSameDay = eventDate.isSame(dayjs(), 'day')

  const getReservationsList = useCallback(async () => {
    const eventId: string = getData('event.id')
    const partnerId: string = currentUser!.partnerId
    try {
      await getEventReservationByPartner(eventId, partnerId)

      const reservations = await getEventReservationByPartner(eventId, partnerId)
      setData(isSameDay, 'event.isToday')
      setData(reservations, 'event.guests')
    } catch (e) {
      console.log('generic error on get reservation ', e)
      Toast.show({
        type: 'error',
        text1: 'Errore!',
        text2: 'Ricerca prenotazioni fallita',
      })

      return back()
    } finally {
      next()
    }
  }, [getData, currentUser, setData, isSameDay, back, next])

  useEffect(() => {
    getReservationsList()
  }, [getReservationsList])
  return <LoadingView />
}
