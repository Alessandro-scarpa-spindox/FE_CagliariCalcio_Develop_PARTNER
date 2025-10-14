import { useFlower, useFlowerForm } from '@flowerforce/flower-react'
import { useNavigation } from '@react-navigation/native'
import { useCallback, useEffect } from 'react'
import Toast from 'react-native-toast-message'
import { LoadingView } from '@/components/LoadingView'
import { getRegisterInformation } from '@/api/getRegisterInformation'

export const GetRegisterInformationList = () => {
  const { next, restart } = useFlower()
  const { setData, getData, unsetData } = useFlowerForm()
  const { navigate }: any = useNavigation()
  const checkRegisterInformation = useCallback(async () => {
    const token = getData('token')
    try {
      const registrationInfo = await getRegisterInformation(token)
      setData(registrationInfo, 'partnerData')
      next()
    } catch (e) {
      setData([], 'registrationInfo')
      unsetData('token')
      Toast.show({
        type: 'error',
        text1: 'Errore!',
        text2: 'Utente non esistente',
      })
      restart()
      navigate('OnBoarding')
    }
  }, [getData, navigate, next, restart, setData, unsetData])

  useEffect(() => {
    checkRegisterInformation()
  }, [checkRegisterInformation])

  return <LoadingView />
}
