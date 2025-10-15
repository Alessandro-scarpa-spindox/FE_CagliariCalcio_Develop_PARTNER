import { db, Realm } from '../provider'
import { Events } from '../schema/Events'
import type { Change } from '@/hooks/useEventsChanges'

type BSONObjectId = string
type EventStatus = 'enabled' | 'closed'

interface EventDocument {
  _id: BSONObjectId
  status: EventStatus
}

export const getEvents = async () => {
  const eventsCollection = db(process.env.EXPO_PUBLIC_REACT_APP_DB).collection<Events>(
    'events',
  )
  const events = await eventsCollection.find()
  return events.map(({ _id, ...event }) => ({ id: _id?.toString(), ...event }))
}

export const watchAllEventsChanges = async (callback: (change: Change) => void) => {
  const eventsCollection = db(process.env.EXPO_PUBLIC_REACT_APP_DB).collection<Events>(
    'events',
  )
  const changeStream = eventsCollection.watch()

  const processChanges = async () => {
    try {
      for await (const change of changeStream) {
        console.log('new change', change)
        callback(change as unknown as Change)
      }
    } catch (error) {
      console.log('error message: ', error)
      return getEvents()
    }
  }

  processChanges()

  return changeStream
}
