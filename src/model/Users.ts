export type User = {
  id: string
  name: string
  email: string
  phone: string
  role: Role
  status: AccountStatus
  creationAt: number
  userId: string
  partnerId: string
  partnerData: PartnerData
}

type Role = 'partner'

type AccountStatus = 'confirmed' | 'pending'

type PartnerData = {
  creationAt: number
  email: string
  maxGuests: number
  name: string
  phone: string
  userId: string
}
