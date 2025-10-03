import { Events } from '@/schema/Events'
import { Realm, db } from '../provider'

export const getEventDetail = async (eventId: string) => {
  const eventsCollection = db(process.env.EXPO_PUBLIC_REACT_APP_DB).collection<Events>(
    'events',
  )

  const event = await eventsCollection.findOne({
    _id: new Realm.BSON.ObjectId(eventId),
  })

  if (!event) throw new Error()

  return event
}
