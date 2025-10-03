import React, { useCallback, useEffect } from 'react'
import { useFlower, useFlowerForm } from '@flowerforce/flower-react'
import Toast from 'react-native-toast-message'
import { LoadingView } from '@/components/LoadingView'
import {
  checkIsReservationEnabled,
  watchEventChanges,
} from '@/api/checkIsReservationEnabled'

export const CheckIsReservationEnabled = () => {
  const { next, back } = useFlower()
  const { getData, setData } = useFlowerForm()

  const checkReservation = useCallback(async () => {
    const eventId = getData('event.id')
    try {
      const reservationStatus = await checkIsReservationEnabled(eventId)
      setData(reservationStatus, 'event.status')
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Errore!',
        text2: 'Ricerca prenotazioni fallita',
      })
      return back()
    } finally {
      next()
    }
  }, [getData, setData, back, next])

  const checkEvent = useCallback(async () => {
    const eventId = getData('event.id')
    try {
      await watchEventChanges(eventId, (change: any) => {
        // ho messo any ordinato dal Dott. Scarpa, da fixare
        const { status, ticket } = change.fullDocument
        setData(status, 'event.status')
        setData(ticket, 'event.ticket')
      })
    } catch (error: any) {
      throw new Error(error)
    }
  }, [getData, setData])

  useEffect(() => {
    checkReservation()
    checkEvent()
  }, [checkEvent, checkReservation])

  return <LoadingView />
}
