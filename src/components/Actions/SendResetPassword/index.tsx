/**
 * > This is a flower action used to send an email for password reset to the current user
 */

import { useCallback, useEffect } from 'react'
import { useFlower, useFlowerForm } from '@flowerforce/flower-react'

import { resetNewPassword } from '@/api/resetNewPassword'

export const SendResetPassword = () => {
  const { getData } = useFlowerForm()
  const { next } = useFlower()

  const resetPassword = useCallback(async () => {
    try {
      const email: string = getData('user.email')
      await resetNewPassword(email)
      next()
    } catch (error) {
      console.error('Error sending password reset email:', error)
    }
  }, [getData, next])

  useEffect(() => {
    resetPassword()
  }, [resetPassword])

  return <></>
}
