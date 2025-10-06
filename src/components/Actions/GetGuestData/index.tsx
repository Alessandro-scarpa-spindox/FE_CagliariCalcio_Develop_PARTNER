import { useFlower, useFlowerForm } from '@flowerforce/flower-react'
import dayjs from 'dayjs'
import { useCallback, useEffect } from 'react'
import { LoadingView } from '@/components/LoadingView'
import { getPassInformations } from '@/api/getPassInformations'

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
  }, [guestId, next, setData])

  useEffect(() => {
    checkPassInformations()
  }, [checkPassInformations])

  return <LoadingView />
}

const checkEventDate = (eventDate: string) => {
  const today = dayjs()

  return dayjs(eventDate).isBefore(today, 'day')
}
