import { Guest } from '@/model/Events'
import { Realm } from '@/provider'
import { db } from '@/provider/index.web'

export const deleteReservations = async (guestsToBeDeleted: Guest[]) => {
  const reservationsCollection = db(process.env.EXPO_PUBLIC_REACT_APP_DB).collection<any>(
    'subscribers',
  )

  guestsToBeDeleted.forEach(async (guestToDelete) => {
    await reservationsCollection.deleteOne({
      _id: new Realm.BSON.ObjectId(guestToDelete.id),
    })
  })
}
