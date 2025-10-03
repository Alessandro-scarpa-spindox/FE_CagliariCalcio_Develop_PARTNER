import { db, app } from '../provider'
import { Spaces } from '../schema/Spaces'

export const getSpaces = async (eventId: string) => {
  const spacesCollection = db(process.env.EXPO_PUBLIC_REACT_APP_DB).collection<Spaces>(
    'spaces',
  )

  const spaces = await spacesCollection.find()

  const count = (await app.currentUser?.functions.getSpaces(eventId)) as Record<
    string,
    string | number
  >[]

  const mappedCount = count.reduce(
    (acc, { _id, count }) => ({ ...acc, [_id]: count }),
    {},
  )

  const mappedSpaces = spaces.map(({ _id, maxGuests, ...rest }: Spaces) => ({
    id: _id.toString(),
    ...rest,
    maxGuests: Number(maxGuests) - (mappedCount[_id.toString()] ?? 0),
  }))
  return mappedSpaces
}
