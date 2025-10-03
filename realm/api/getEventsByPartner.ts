import dayjs from 'dayjs'
import { Events } from '../schema/Events'
import { db } from '@/provider'

export const getPrevEventsByPartner = async (eventId: string) => {
  const eventsCollection = db(process.env.EXPO_PUBLIC_REACT_APP_DB).collection<Events>(
    'events',
  )
  const events = await eventsCollection.find()

  const currentEvent = events.find((event) => event._id.toString() === eventId)

  const prevEvents = events.filter((event) =>
    dayjs(event.date).isBefore(dayjs(currentEvent?.date), 'minute'),
  )

  const sortedEvents = prevEvents.sort((a, b) =>
    dayjs(a?.date).isAfter(dayjs(b?.date)) ? -1 : 1,
  )

  const prevEvent = sortedEvents[0] ? sortedEvents[0]._id.toString() : null

  return prevEvent
}
