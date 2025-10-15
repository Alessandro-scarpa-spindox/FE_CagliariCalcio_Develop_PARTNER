import { Spaces } from '@/schema/Spaces'

type Partners = {
  [x: string]: {
    spaces: Omit<Spaces, 'name' | '_id' | 'maxGuests'> & { guests: number }
    guests: number
  }
}

export type Event = {
  id: string
  title: string
  type?: string
  name?: string
  place?: string
  opponent?: string
  date: number
  day?: number
  league: string
  totalGuests: number
  description?: string
  reservationsEnabled: boolean
  color: string
  partners: Partners
  searchable: string[]
  loungeColor: string
  loungeNumber: number
  status: EventStatus
  ticket: any
}

export type Events = Event[]

export type EventStatus = 'opened' | 'closed'

export type Guest = {
  firstName: string
  lastName: string
  birthDate: string | Date
  id: string
  email: string
  phoneNumber?: number
  eventId: string
  partnerId: string
  spaceId: string
  qrcode: string
  status: boolean
  lastSentTicket?: number
}
