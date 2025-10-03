/**
 * > This is a flower action used to send an email for password reset to the current user
 */

import { useCallback, useEffect } from 'react'
import { useFlower, useFlowerForm } from '@flowerforce/flower-react'
import Toast from 'react-native-toast-message'
import { app } from '@/provider'

export const ConfirmPassword = () => {
  const { getData } = useFlowerForm()

  const { back, next } = useFlower()

  const confirmPassword = useCallback(async () => {
    try {
      const password: string = getData('newPassword')
      const token: string = getData('token')
      const tokenId: string = getData('tokenId')

      if (password && token && tokenId) {
        await app.emailPasswordAuth.resetPassword({ token, tokenId, password })
        return next('onSuccess')
      }
      throw new Error('Missing tokens')
    } catch (e) {
      console.log('error in resetPassword', e)
      Toast.show({
        type: 'error',
        text1: 'Errore!',
        text2: 'Reset password fallito',
      })
      back()
    }
  }, [back, next, getData])

  useEffect(() => {
    confirmPassword()
  }, [confirmPassword])

  return <></>
}
