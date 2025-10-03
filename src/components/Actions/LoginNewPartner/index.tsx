import { useFlower, useFlowerForm } from '@flowerforce/flower-react'
import { useNavigation } from 'expo-router'
import React, { useCallback, useEffect } from 'react'
import Toast from 'react-native-toast-message'
import { LoadingView } from '@/components/LoadingView'
import { useLogin } from '@/hooks/useLogin'
import { useRealmAuth } from '@/hooks/useRealmAuth'
import { app } from '@/provider'

export const LoginNewPartner = () => {
  const { loginUser: loginUserFn } = useRealmAuth()
  const loginUser = useLogin({ credentialsId: 'partnerData' })
  const { next } = useFlower()
  const { getData } = useFlowerForm()
  const { unsetData } = useFlowerForm({ flowName: 'onboarding' })
  const { navigate }: any = useNavigation()

  const onLoginNewPartner = useCallback(async () => {
    const { tokenId, email, password } = getData('partnerData')
    const userId = getData('currentUserId')

    try {
      await loginUserFn(email, password)

      await app.currentUser?.functions.registerPartner(tokenId, userId)

      await loginUser()

      unsetData('partnerData')
      navigate('OnBoarding')
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Errore!',
        text2: 'Si sono verificati dei problemi',
      })
      console.log('error message : ', e)
      next('onError')
    }
  }, [getData, loginUserFn, loginUser, unsetData, navigate, next])

  useEffect(() => {
    onLoginNewPartner()
  }, [onLoginNewPartner])

  return <LoadingView />
}
