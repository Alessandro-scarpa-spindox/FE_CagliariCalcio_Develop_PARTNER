export type Space = {
  id: string
  name: string
  color: string
  maxGuests: number
}

export type PartnerSpace = {
  [x: string]: { color: string; guests: number; name?: string }
}
