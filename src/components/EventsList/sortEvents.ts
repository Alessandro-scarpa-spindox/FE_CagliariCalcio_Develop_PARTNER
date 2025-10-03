import dayjs from 'dayjs'
import { Event, Events } from '@/model/Events'

/**
 * > Used to sort events recived from DB, including only furure events and events without date
 * @param events -> a list
 * @param onPurchaseError -> a function called on purchase error
 * @returns  eventsWithoutDate: Event[], futureEvents: Event[]
 */

export const sortEvents = (events: Events, partnerId: string): Events => {
  const filteredEvents = events.filter(
    (evt: Event) =>
      evt.partners[partnerId] && Object.keys(evt.partners[partnerId]?.spaces).length > 0,
  )
  const { eventsWithoutDate, futureEvents } = filteredEvents.reduce(
    ({ eventsWithoutDate, futureEvents }, { date, ...event }) => {
      if (
        date &&
        (dayjs(date).isSame(dayjs(), 'day') || dayjs(date).isAfter(dayjs(), 'minute'))
      ) {
        return { eventsWithoutDate, futureEvents: [...futureEvents, { ...event, date }] }
      }
      if (!date) {
        return {
          futureEvents,
          eventsWithoutDate: [...eventsWithoutDate, { ...event, date }],
        }
      }
      return { eventsWithoutDate, futureEvents }
    },
    { eventsWithoutDate: [] as Events, futureEvents: [] as Events },
  )

  futureEvents.sort((a, b) => (dayjs(a.date).isBefore(dayjs(b.date)) ? -1 : 1))

  return [...futureEvents, ...eventsWithoutDate]
}
