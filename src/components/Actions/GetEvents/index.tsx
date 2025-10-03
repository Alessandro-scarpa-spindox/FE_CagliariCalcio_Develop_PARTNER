import { useFlower, useFlowerForm } from '@flowerforce/flower-react'
import { useCallback, useEffect } from 'react'
import { LoadingView } from '@/components/LoadingView'
import { getEvents, watchEventChanges } from '@/api/getEvents'

export const GetEvents = () => {
  const { next, restart } = useFlower()
  const { getData, setData } = useFlowerForm()

  const getEventsList = useCallback(async () => {
    try {
      const eventsData = await getEvents()
      setData(eventsData, 'events')
      const events = getData('events')

      await watchEventChanges(events, (change: any) => {
        restart()
      })
    } catch (e) {
      console.log('error message - ', e)
      setData([], 'events')
    } finally {
      next()
    }
  }, [getData, next, restart, setData])

  const checkEvent = useCallback(async () => {
    try {
      const events = getData('events')
      const prevEvents = await getEvents()
      await watchEventChanges(events, (change: any) => {
        const { fullDocument } = change

        const updatedEvents = prevEvents.map((event) =>
          event.id === fullDocument._id.toString()
            ? { ...event, status: fullDocument.status }
            : event,
        )
        setData(updatedEvents, 'events')
        restart()
      })
    } catch (err: any) {
      throw new Error(err)
    }
  }, [getData, restart, setData])

  useEffect(() => {
    getEventsList()
    checkEvent()
  }, [getEventsList, checkEvent])
  return <LoadingView />
}
