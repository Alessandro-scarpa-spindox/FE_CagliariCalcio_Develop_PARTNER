import { app } from '../provider'
import { User } from '@/model/Users'

export const getUserData = async (userId?: string) => {
  return (await app.currentUser?.functions.getUserData(userId)) as User
}
