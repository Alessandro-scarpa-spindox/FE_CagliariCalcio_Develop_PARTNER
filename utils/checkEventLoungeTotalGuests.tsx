import { Guest } from '@/model/Events'
import { PartnerSpace } from '@/model/Space'

export const checkEventLoungeTotalGuests = (
  eventPartnerSpaces: PartnerSpace,
  tempGuests: Guest[],
) => {
  const tempSpaces = tempGuests?.reduce((acc, guest) => {
    const space = acc[guest.spaceId]
    return { ...acc, [guest.spaceId]: { ...space, guests: space?.guests - 1 } }
  }, eventPartnerSpaces)

  return tempSpaces
}
