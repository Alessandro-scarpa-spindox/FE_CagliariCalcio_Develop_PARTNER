import { db } from '../provider'
import { Subscribers } from '@/schema/Subscribers'

export const deleteReservation = async (eventId: string, partnerId: string) => {
  const reservationsCollection = db(
    process.env.EXPO_PUBLIC_REACT_APP_DB,
  ).collection<Subscribers>('subscribers')
  if (eventId && partnerId) {
    return await reservationsCollection.deleteMany({ eventId, partnerId })
  }
}
