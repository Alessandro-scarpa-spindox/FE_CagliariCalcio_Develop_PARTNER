import {
  Flower,
  FlowerNode,
  FlowerAction,
  useFlowerForm,
} from '@flowerforce/flower-react'
import { useCallback } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { EventsList } from '@/components/EventsList'
import { withBackgroundImage } from '@/hocs/withLayout'
import { GetEvents } from '@/components/Actions/GetEvents'
import { Event } from '@/model/Events'
import { Change, useEventsChanges } from '@/hooks/useEventsChanges'

export const HomePage = withBackgroundImage(() => {
  const { getData, setData } = useFlowerForm({ flowName: 'homePage' })
  const isFocused = useIsFocused()
  console.log('ISFOCUSED HOME', isFocused)

  const processChanges = useCallback(
    (change: Change) => {
      console.log('change', change)
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

  useEventsChanges(processChanges, isFocused)
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
