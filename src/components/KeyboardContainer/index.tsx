import React, { useCallback } from 'react'
import { Platform, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
import { Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native'
import { Fragment } from 'react'
import { View } from 'react-native'
import useIsFloatingKeyboard from '@/hooks/useIsFloatingKeyboard'

export default function KeyboardContainer({ children, noStyle, style, safearea }: any) {
  const SafeArea = safearea ? SafeAreaView : Fragment
  const propsSafeArea = safearea ? { style: styles.flex } : {}

  const floating = useIsFloatingKeyboard()

  const onTap = useCallback(() => {
    Keyboard.dismiss()
  }, [])

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={60}
      behavior={noStyle ? 'height' : Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled={!floating}
      style={noStyle ? undefined : [styles.main, style]}
    >
      <TouchableWithoutFeedback onPress={onTap}>{children}</TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  main: {
    flex: 1,
  },
})
