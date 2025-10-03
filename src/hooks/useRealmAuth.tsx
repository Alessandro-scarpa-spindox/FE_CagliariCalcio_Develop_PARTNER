import { useContext } from 'react'
import { authenticationContext } from '@/context/AuthenticationProvider/context'

export const useRealmAuth = () => {
  const { isAuthenticated, loginUser, logoutUser, currentUser } =
    useContext(authenticationContext)

  return { isAuthenticated, loginUser, logoutUser, currentUser }
}
