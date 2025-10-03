import React, { PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'
import { Modal as KModal } from '@ui-kitten/components'
import { useModalManager } from '@/hooks/useModalManager'

type ModalProps = PropsWithChildren<{
  modalKey: string
}>

export const Modal = ({ modalKey, children }: ModalProps): React.ReactElement => {
  const { isOpen, closeModal } = useModalManager(modalKey)
  return (
    <View>
      <KModal
        visible={isOpen}
        backdropStyle={styles.backdrop}
        onBackdropPress={closeModal}
      >
        {children}
      </KModal>
    </View>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})
