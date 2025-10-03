import { useFlowerForm } from '@flowerforce/flower-react'
import { useNavigation } from '@react-navigation/native'
import { useCallback, useEffect } from 'react'
import Toast from 'react-native-toast-message'
import { app } from '@/provider'
import { LoadingView } from '@/components/LoadingView'

export const GetConfirmRegistration = () => {
  const { getData } = useFlowerForm()
  const { navigate }: any = useNavigation()
  const confirmRegistration = useCallback(async () => {
    const token = getData('token')
    const tokenId = getData('tokenId')
    try {
      await app.emailPasswordAuth.confirmUser({ token, tokenId })
      Toast.show({
        type: 'success',
        text1: 'Utente confermato!',
        text2: "L'utente è stato confermato",
      })
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Errore!',
        text2: 'Creazione utente non completata',
      })
      console.log('error message:', e)
    } finally {
      navigate('OnBoarding')
    }
  }, [getData, navigate])

  useEffect(() => {
    confirmRegistration()
  }, [confirmRegistration])

  return <LoadingView />
}
