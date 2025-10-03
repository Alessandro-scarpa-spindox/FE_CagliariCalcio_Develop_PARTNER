import { useCallback, useContext, useMemo } from 'react'
import { modalContext } from '@/context/Modal/context'

export const useModalManager = (observeKey?: string) => {
  const [modalKey, toggleModal] = useContext(modalContext)

  const openModal = useCallback(() => {
    observeKey && toggleModal(observeKey)
  }, [observeKey, toggleModal])

  const closeModal = useCallback(() => {
    toggleModal('')
  }, [toggleModal])

  const isOpen = useMemo(() => modalKey === observeKey, [modalKey, observeKey])
  return { isOpen, openModal, closeModal }
}
