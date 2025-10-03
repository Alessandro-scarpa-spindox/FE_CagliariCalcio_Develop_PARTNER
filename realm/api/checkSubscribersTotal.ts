import { app } from '@/provider'

export const getSubscribersTotal = async (eventId: string, partnerId: string) => {
  return await app.currentUser?.functions.getSubscribersTotal(eventId, partnerId)
}
