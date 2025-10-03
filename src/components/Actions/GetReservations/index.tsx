import { useFlower } from '@flowerforce/flower-react'
import { useCallback, useEffect } from 'react'
import { LoadingView } from '@/components/LoadingView'

export const GetReservations = () => {
  const { next } = useFlower()

  const onGetReservations = useCallback(async () => {
    next()
  }, [next])

  useEffect(() => {
    onGetReservations()
  }, [onGetReservations])

  return <LoadingView />
}
