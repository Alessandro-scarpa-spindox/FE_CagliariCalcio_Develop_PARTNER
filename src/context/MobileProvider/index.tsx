import { PropsWithChildren, useState } from 'react'
import { Dimensions, SafeAreaView } from 'react-native'
import { MobileContext, mobileContext } from './context'

const Provider = mobileContext.Provider

type MobileProviderProps = PropsWithChildren

const MOBILE_BREAKPOINT = 768

const { width } = Dimensions.get('screen')

export const MobileProvider = ({ children }: MobileProviderProps) => {
  const [isMobile, setIsMobile] = useState<MobileContext['isMobile']>(
    width < MOBILE_BREAKPOINT,
  )

  return (
    <Provider value={{ isMobile }}>
      <SafeAreaView
        style={{ flex: 1 }}
        onLayout={({ nativeEvent }) =>
          setIsMobile(nativeEvent.layout.width < MOBILE_BREAKPOINT)
        }
      >
        {children}
      </SafeAreaView>
    </Provider>
  )
}
