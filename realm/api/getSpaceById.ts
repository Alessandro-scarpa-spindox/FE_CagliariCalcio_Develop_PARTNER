import { db, Realm } from '@/provider'
import { Spaces } from '@/schema/Spaces'

export const getSpaceById = async (id: string) => {
  const spacesCollection = db(process.env.EXPO_PUBLIC_REACT_APP_DB).collection<Spaces>(
    'spaces',
  )

  return await spacesCollection.findOne({ _id: new Realm.BSON.ObjectID(id) })
}
