import { db, Realm } from '../provider'
import { Events } from '@/schema/Events'

type BSONObjectId = string
type EventStatus = 'enabled' | 'closed'

interface EventDocument {
  _id: BSONObjectId
  status: EventStatus
}

export const checkIsReservationEnabled = async (eventId: string) => {
  const eventsCollection = db(process.env.EXPO_PUBLIC_REACT_APP_DB).collection<Events>(
    'events',
  )
  const reservation = await eventsCollection.findOne(
    {
      _id: new Realm.BSON.ObjectId(eventId),
    },
    {
      projection: {
        _id: 0,
        status: 1,
      },
    },
  )

  return reservation?.status
}

export const watchEventChanges = async (
  eventId: string,
  callback: (change: Realm.Services.MongoDB.ChangeEvent<EventDocument | any>) => void,
): Promise<() => void> => {
  const eventsCollection = db(process.env.EXPO_PUBLIC_REACT_APP_DB).collection<Events>(
    'events',
  )

  const changeStream = eventsCollection.watch({
    filter: {
      'fullDocument._id': new Realm.BSON.ObjectId(eventId),
    },
  })

  const processChanges = async () => {
    try {
      for await (const change of changeStream) {
        callback(change)
      }
    } catch (error) {
      console.log('error message : ', error)
    }
  }

  processChanges()

  return () => {
    changeStream.return(null)
  }
}
