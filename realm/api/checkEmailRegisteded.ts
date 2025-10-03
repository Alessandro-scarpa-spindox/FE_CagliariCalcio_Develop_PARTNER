import { db } from '@/provider'
import { Users } from '@/schema/Users'

export const checkEmailRegisteded = async (email: string) => {
  const usersCollection = db(process.env.EXPO_PUBLIC_REACT_APP_DB).collection<Users>(
    'users',
  )

  const partnerUser = await usersCollection.findOne({ email, role: 'partner' })

  return partnerUser || null
}
