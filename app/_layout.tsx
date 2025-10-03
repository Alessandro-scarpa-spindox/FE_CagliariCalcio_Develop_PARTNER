import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'
import { FlowerProvider } from '@flowerforce/flower-react'
import { ApplicationProvider } from '@ui-kitten/components'
import * as eva from '@eva-design/eva'
//@ts-ignore
// import { Devtool } from '@flowerforce/devtool'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/it'
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message'
import { App } from './app'
import { Colors } from '@/constants/Colors'
import { ModalProvider } from '@/context/Modal'
import { AuthenticationProvider } from '@/context/AuthenticationProvider'
import { NotAuthStack } from '@/Stacks/notAuthStack'

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: Colors.success,
        boxShadow: '0 0 8px rgba(0,0,0,0.2)',
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 14,
        fontWeight: '600',
        color: Colors.success,
        marginBottom: '7px',
      }}
      text2Style={{
        fontSize: 16,
        fontWeight: '500',
        color: 'rgba(0,0,0,0.9)',
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: Colors.danger, boxShadow: '0 0 8px rgba(0,0,0,0.2)' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 14,
        fontWeight: '600',
        color: Colors.danger,
      }}
      text2Style={{
        fontSize: 16,
        fontWeight: '500',
        color: 'rgba(0,0,0,0.9)',
      }}
    />
  ),
}

const THEME = {
  ...eva.dark,
  'background-basic-color-1': Colors.textLight,
  'color-primary-200': 'red',
  'text-basic-color': Colors.text,
  'text-control-color': Colors.text,
  'color-basic-600': Colors.backgroundPrimaryLight,
}

dayjs.extend(customParseFormat)
dayjs.locale('it')

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      /*       Devtool({
        host: '192.168.1.132',
        port: 8770,
      }) */
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <ApplicationProvider {...eva} theme={THEME}>
      <FlowerProvider enableReduxDevtool>
        <ModalProvider>
          <AuthenticationProvider fallBack={NotAuthStack}>
            <App />
          </AuthenticationProvider>
        </ModalProvider>
        <Toast config={toastConfig} />
      </FlowerProvider>
    </ApplicationProvider>
  )
}
