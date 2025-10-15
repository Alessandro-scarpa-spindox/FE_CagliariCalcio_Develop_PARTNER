import {
  Flower,
  FlowerNode,
  FlowerAction,
  useFlowerForm,
} from '@flowerforce/flower-react'
import { useCallback, useEffect } from 'react'
import { EventsList } from '@/components/EventsList'
import { withBackgroundImage } from '@/hocs/withLayout'
import { GetEvents } from '@/components/Actions/GetEvents'
import { watchAllEventsChanges } from '@/api/getEvents'
import { Event } from '@/model/Events'

export const HomePage = withBackgroundImage(() => {
  const { getData, setData } = useFlowerForm({ flowName: 'homePage' })

  const processChanges = useCallback(
    (change: any) => {
      const { fullDocument, operationType, documentKey } = change

      const prevEvents: Event[] = getData('events') ?? []

      if (operationType === 'insert') {
        setData(
          [...prevEvents, { ...fullDocument, id: fullDocument._id.toString() }],
          'events',
        )
        return
      }

      if (operationType === 'delete') {
        setData(
          prevEvents.filter(({ id }) => id !== documentKey._id.toString()),
          'events',
        )
        return
      }

      const updatedEvents = prevEvents.map((event) =>
        event.id === fullDocument._id.toString()
          ? { ...event, status: fullDocument.status }
          : event,
      )
      setData(updatedEvents, 'events')
    },
    [getData, setData],
  )
  useEffect(() => {
    const onClose = watchAllEventsChanges(processChanges)
    return () => {
      onClose.then((callback) => callback())
    }
  }, [processChanges])

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
