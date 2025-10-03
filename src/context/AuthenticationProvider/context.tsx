import { createContext } from 'react'
import { app } from '@/provider'
import { User } from '@/model/Users'

export type AuthenticationContext = {
  isAuthenticated: boolean
  loginUser: (email: string, password: string) => Promise<User | undefined>
  logoutUser: () => void
  currentUser?: User
}
export const authenticationContext = createContext<AuthenticationContext>({
  isAuthenticated: !!app.currentUser?.isLoggedIn,
  loginUser: async (email, password) => undefined,
  logoutUser: () => {},
  currentUser: undefined,
})
