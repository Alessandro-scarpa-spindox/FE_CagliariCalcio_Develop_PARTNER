import { getPassInformations } from '@/api/getPassInformations'
import { LoadingView } from '@/components/LoadingView'
import { useFlower, useFlowerForm } from '@flowerforce/flower-react'
import dayjs from 'dayjs'
import { useCallback, useEffect } from 'react'

export const GetPassData = () => {
  const { next } = useFlower()
  const { setData, getData } = useFlowerForm()
  const guestId = getData('guestId')

  const checkPassInformations = useCallback(async () => {
    try {
      const eventPassInformations = await getPassInformations(guestId)

      setData(eventPassInformations, 'ticketInfo')

      if (checkEventDate(eventPassInformations.event.date)) {
        return next('onExpiredError')
      }

      next('onSuccess')
    } catch (e) {
      setData([], 'ticketInfo')

      next('onError')
    }
  }, [next, setData])

  useEffect(() => {
    checkPassInformations()
  }, [checkPassInformations])

  return <LoadingView />
}

const checkEventDate = (eventDate: string) => {
  const today = dayjs()

  return dayjs(eventDate).isBefore(today, 'day')
}
