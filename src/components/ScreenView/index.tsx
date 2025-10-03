import { PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'

type ScreenViewProps = PropsWithChildren<{
  centerContent?: boolean
}>

export const ScreenView = ({ children, centerContent = false }: ScreenViewProps) => {
  return (
    <View style={[styles.screenView, centerContent && styles.centeredView]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
  },
  centeredView: {
    display: 'flex',
    justifyContent: 'center',
    rowGap: 16,
  },
})
