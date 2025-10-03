import { View } from 'react-native'
import { PropsWithChildren } from 'react'
import { Header } from '../Header'

type LayoutProps = PropsWithChildren<{
  withBack?: boolean
}>

export const Layout = ({ children, withBack }: LayoutProps) => {
  return (
    <View style={{ flex: 1 }}>
      <Header withBack={withBack} />
      {children}
    </View>
  )
}
