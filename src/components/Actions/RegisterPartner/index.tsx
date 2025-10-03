import { useFlower, useFlowerForm } from '@flowerforce/flower-react'
import { useCallback, useEffect } from 'react'
import Toast from 'react-native-toast-message'
import { LoadingView } from '@/components/LoadingView'
import { registerUser } from '@/api/registerUser'

export const RegisterPartner = () => {
  const { next } = useFlower()
  const { getData, setData } = useFlowerForm()

  const onRegisterPartner = useCallback(async () => {
    const { email, password } = getData('partnerData')
    try {
      const { userId } = await registerUser(email, password)

      setData(userId, 'currentUserId')

      next('onSuccess')
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Errore!',
        text2: 'Creazione utente non completata',
      })
      console.log('error : ', e)
      next('onError')
    }
  }, [next, getData, setData])

  useEffect(() => {
    onRegisterPartner()
  }, [onRegisterPartner])

  return <LoadingView />
}
