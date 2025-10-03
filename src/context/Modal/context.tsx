import { createContext } from 'react'

export type ModalContext = [string, (modalkey: string) => void]
export const modalContext = createContext<ModalContext>(['', (modalKey) => {}])
