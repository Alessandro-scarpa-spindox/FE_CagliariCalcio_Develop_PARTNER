import React, { useCallback, useEffect } from 'react'
import { useFlower, useFlowerForm } from '@flowerforce/flower-react'
import { LoadingView } from '@/components/LoadingView'
import { deleteReservations } from '@/api/deleteReservations'

const DeleteGuests = () => {
  const { next, restart } = useFlower()
  const { getData } = useFlowerForm()

  const onDeleteGuests = useCallback(async () => {
    try {
      const guestsToBeDeleted = getData('guestsToBeDeleted')

      if (guestsToBeDeleted?.length > 0) {
        await deleteReservations(guestsToBeDeleted)
      }

      restart()
    } catch (e) {
      console.log('error delete reservation -', e)
      next('onError')
    }
  }, [getData, next, restart])

  useEffect(() => {
    onDeleteGuests()
  }, [onDeleteGuests])

  return <LoadingView />
}

export default DeleteGuests
