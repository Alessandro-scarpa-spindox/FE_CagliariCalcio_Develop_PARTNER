import React, { useCallback, useEffect } from 'react'
import { useFlower, useFlowerForm } from '@flowerforce/flower-react'
import dayjs from 'dayjs'
import { getEventDetail } from '@/api/getEventData'
import { LoadingView } from '@/components/LoadingView'
import { useRealmAuth } from '@/hooks/useRealmAuth'
import { Guest } from '@/model/Events'
import { nanoid } from 'nanoid'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import Toast from 'react-native-toast-message'

dayjs.extend(customParseFormat)
const CheckEventExists = () => {
  const { back, next, restart } = useFlower()
  const { getData, setData } = useFlowerForm()
  const { currentUser } = useRealmAuth()

  const checkEventExists = useCallback(async () => {
    const eventId = getData('event.id')

    const status = getData('event.status')

    try {
      await getEventDetail(eventId)

      if (!eventId || status === 'closed') {
        Toast.show({
          type: 'error',
          text1: 'Errore!',
          text2: "La prenotazione dell'evento è bloccata",
        })

        restart
      }

      if (currentUser) {
        next('onAddReservations')
      }
    } catch (e) {
      next('onError')
    }
  }, [getData, setData, next, restart, currentUser])

  useEffect(() => {
    checkEventExists()
  }, [checkEventExists])

  return <LoadingView />
}

export default CheckEventExists

function nanoId(excludedString?: string[]) {
  const newId = nanoid(7)

  if (excludedString?.includes(newId)) {
    return nanoId(excludedString)
  }

  return newId
}
