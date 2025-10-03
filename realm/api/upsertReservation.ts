import { app } from '../provider'
import { Guest } from '@/model/Events'

export const upsertReservation = async (
  eventId: string,
  partnerId: string,
  guests: Guest[],
) => {
  return await app.currentUser?.functions.updateReservation(guests, eventId, partnerId)
}
