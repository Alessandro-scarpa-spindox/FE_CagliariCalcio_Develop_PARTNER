import { useFlower, useFlowerForm } from '@flowerforce/flower-react'
import { useCallback, useEffect } from 'react'
import { LoadingView } from '@/components/LoadingView'
import { useRealmAuth } from '@/hooks/useRealmAuth'

export const GetCurrentUser = () => {
  const { next } = useFlower()
  const { currentUser } = useRealmAuth()
  const { setData } = useFlowerForm()

  const getUserData = useCallback(async () => {
    if (currentUser) {
      setData(currentUser, 'user')
    }
    next()
  }, [currentUser, next, setData])

  useEffect(() => {
    getUserData()
  }, [getUserData])
  return <LoadingView />
}
