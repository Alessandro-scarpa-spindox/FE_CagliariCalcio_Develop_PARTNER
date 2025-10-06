import { db, Realm } from '../provider'
import { Events } from '../schema/Events'

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

export const watchEventChanges = async (
  events: string[],
  callback: (change: Realm.Services.MongoDB.ChangeEvent<EventDocument | any>) => void,
): Promise<() => void> => {
  const eventsCollection = db(process.env.EXPO_PUBLIC_REACT_APP_DB).collection<Events>(
    'events',
  )
  const changeStream = eventsCollection.watch()
  console.log('changeStream', changeStream)
  const processChanges = async () => {
    try {
      for await (const change of changeStream) {
        console.log('new change', change)
        callback(change)
      }
    } catch (error) {
      console.log('error message: ', error)
      return getEvents()
      // throw new Error(error)
    }
  }

  processChanges()

  return () => {
    changeStream.return(null)
  }
}
