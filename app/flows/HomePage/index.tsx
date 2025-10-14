import {
  Flower,
  FlowerNode,
  FlowerAction,
  useFlowerForm,
} from '@flowerforce/flower-react'
import { useEffect } from 'react'
import { EventsList } from '@/components/EventsList'
import { withBackgroundImage } from '@/hocs/withLayout'
import { GetEvents } from '@/components/Actions/GetEvents'
import { watchAllEventsChanges } from '@/api/getEvents'
import { Event } from '@/model/Events'

export const HomePage = withBackgroundImage(() => {
  const { getData, setData } = useFlowerForm({ flowName: 'homePage' })
  useEffect(() => {
    const onClose = watchAllEventsChanges((change: any) => {
      console.log('change', change)
      const { fullDocument } = change

      const prevEvents = getData('events') ?? []

      console.log('prevents', prevEvents)

      const updatedEvents = prevEvents.map((event: Event) =>
        event.id === fullDocument._id.toString()
          ? { ...event, status: fullDocument.status }
          : event,
      )
      setData(updatedEvents, 'events')
    })
    return () => {
      onClose.then((callback) => callback())
    }
  }, [getData, setData])
  return (
    <Flower name="homePage">
      {/**
       * RECUPERO LISTA EVENTI
       * Download degli eventi da DB
       */}
      <FlowerAction id="getEvents" to={{ home: null }}>
        <GetEvents />
      </FlowerAction>
      <FlowerNode id="home" to={{ goToDetail: null }}>
        <EventsList />
      </FlowerNode>
    </Flower>
  )
})
