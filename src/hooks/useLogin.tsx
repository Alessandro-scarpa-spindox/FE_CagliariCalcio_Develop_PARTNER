import { useFlower, useFlowerForm } from '@flowerforce/flower-react'
import { useCallback } from 'react'
import { useRealmAuth } from './useRealmAuth'
import { useModalManager } from './useModalManager'
import { LOGIN_ERROR_KEY } from '@/constants/modals'
import { app } from '@/provider'

type UseLoginParams = {
  credentialsId: string
}

export const useLogin = ({ credentialsId }: UseLoginParams) => {
  const { getData } = useFlowerForm()
  const { next, back } = useFlower()
  const { loginUser: loginUserFn } = useRealmAuth()
  const credentialsForm = getData(credentialsId)

  const { openModal } = useModalManager(LOGIN_ERROR_KEY)

  const loginUser = useCallback(async () => {
    try {
      const { email, password } = credentialsForm
      const normalizedEmail = email?.trim().toLowerCase()
      await loginUserFn(normalizedEmail, password)

      if (app.currentUser) {
        return next()
      }
      openModal()
      return back()
    } catch (e) {
      console.log('error message : ', e)
      return back()
    }
  }, [back, credentialsForm, next, loginUserFn, openModal])
  return loginUser
}
