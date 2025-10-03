import dayjs from 'dayjs'
import { db } from '../provider'
import { Subscribers } from '@/schema/Subscribers'

export const getEventReservationByPartner = async (
  eventId: string,
  partnerId: string,
) => {
  const subscribersCollection = db(
    process.env.EXPO_PUBLIC_REACT_APP_DB,
  ).collection<Subscribers>('subscribers')
  const reservations = await subscribersCollection.find({
    eventId,
    partnerId,
  })

  return reservations.map(({ _id, birthDate, ...reservation }) => ({
    id: _id.toString(),
    birthDate: birthDate ? dayjs(birthDate).format('DD/MM/YYYY') : '',
    ...reservation,
  }))
}
