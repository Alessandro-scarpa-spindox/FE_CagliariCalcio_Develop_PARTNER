import { createContext } from 'react'

export type MobileContext = {
  isMobile: boolean
}
export const mobileContext = createContext<MobileContext>({
  isMobile: false,
})
