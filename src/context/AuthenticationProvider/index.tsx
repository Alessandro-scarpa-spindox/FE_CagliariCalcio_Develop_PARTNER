import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { authenticationContext } from './context'
import { app, Realm } from '@/provider'
import { getUserData } from '@/api/getUserData'
import { User } from '@/model/Users'
import { LoadingView } from '@/components/LoadingView'

const Provider = authenticationContext.Provider

type AuthenticationProviderProps = PropsWithChildren<{
  fallBack: () => React.JSX.Element
  splash?: () => React.JSX.Element
}>

export const AuthenticationProvider = ({
  children,
  fallBack: FallbackElement,
  splash: Splash = () => <LoadingView />,
}: AuthenticationProviderProps) => {
  const { navigate }: any = useNavigation()

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      if (app.currentUser) {
        try {
          await app.currentUser.refreshCustomData()
          const userData = await getUserData(app.currentUser.id)

          if (userData) {
            setIsAuthenticated(true)
            setCurrentUser(userData)
          } else {
            await app.currentUser.logOut()
            setIsAuthenticated(false)
            setCurrentUser(undefined)
            navigate('OnBoarding')
          }
        } catch (err) {
          console.log('refresh/token error:', err)
          await app.currentUser.logOut()
          setIsAuthenticated(false)
          setCurrentUser(undefined)
          navigate('OnBoarding')
        }
      } else {
        setIsAuthenticated(false)
        setCurrentUser(undefined)
        navigate('OnBoarding')
      }
      setLoading(false)
    }

    checkUser()
  }, [navigate])

  const loginUser = useCallback(async (email: string, password: string) => {
    try {
      const credentials = Realm.Credentials.emailPassword(email.toLowerCase(), password)
      const user = await app.logIn(credentials)
      const userData = await getUserData(user.id)

      if (user && userData) {
        setIsAuthenticated(true)
        setCurrentUser(userData)
        return userData
      }

      if (user) {
        await user.logOut()
      }
    } catch (e) {
      console.log('login error:', e)
    }
  }, [])

  const logoutUser = useCallback(async () => {
    try {
      await app.currentUser?.logOut()
      setIsAuthenticated(false)
      setCurrentUser(undefined)
      navigate('OnBoarding')
    } catch (e) {
      console.log('logout error:', e)
    }
  }, [navigate])

  if (loading) {
    return <Splash />
  }

  return (
    <Provider value={{ isAuthenticated, loginUser, logoutUser, currentUser }}>
      {isAuthenticated ? children : <FallbackElement />}
    </Provider>
  )
}
