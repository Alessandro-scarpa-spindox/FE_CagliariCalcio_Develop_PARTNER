import React, { useCallback, useEffect } from 'react'
import { useFlower, useFlowerForm } from '@flowerforce/flower-react'
import { LoadingView } from '@/components/LoadingView'
import { useRealmAuth } from '@/hooks/useRealmAuth'
import { deleteReservations } from '@/api/deleteReservations'
import { useNavigation } from 'expo-router'

const DeleteGuests = () => {
  const { back, next, restart } = useFlower()
  const { getData, setData } = useFlowerForm()
  const { currentUser } = useRealmAuth()

  const { reset } = useNavigation()

  const onDeleteGuests = useCallback(async () => {
    try {
      const guestsToBeDeleted = getData('guestsToBeDeleted')

      if (guestsToBeDeleted?.length > 0) {
        await deleteReservations(guestsToBeDeleted)
      }

      restart()
    } catch (e) {
      next('onError')
    }
  }, [getData, setData, next, back, restart, currentUser])

  useEffect(() => {
    onDeleteGuests()
  }, [onDeleteGuests])

  return <LoadingView />
}

export default DeleteGuests
