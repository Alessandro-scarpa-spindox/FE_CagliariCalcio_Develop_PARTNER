import { PropsWithChildren, useCallback, useState } from 'react'
import { modalContext } from './context'

const Provider = modalContext.Provider

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [currentKey, setCurrentKey] = useState('')
  const toggleModal = useCallback((modalKey: string = '') => setCurrentKey(modalKey), [])
  return <Provider value={[currentKey, toggleModal]}>{children}</Provider>
}
