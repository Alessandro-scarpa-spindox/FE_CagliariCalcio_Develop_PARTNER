import { useFlower, useFlowerForm } from '@flowerforce/flower-react'
import { useCallback, useEffect } from 'react'
import { LoadingView } from '@/components/LoadingView'
import { getEvents } from '@/api/getEvents'

export const GetEvents = () => {
  const { next } = useFlower()
  const { setData } = useFlowerForm()

  const getEventsList = useCallback(async () => {
    try {
      const eventsData = await getEvents()
      setData(eventsData, 'events')
    } catch (e) {
      console.log('error message - ', e)
      setData([], 'events')
    } finally {
      next()
    }
  }, [next, setData])

  const checkEvent = useCallback(async () => {
    try {
      await getEvents()
    } catch (err: any) {
      throw new Error(err)
    }
  }, [])

  useEffect(() => {
    getEventsList()
    checkEvent()
  }, [getEventsList, checkEvent])
  return <LoadingView />
}
