import { useContext } from 'react'
import { mobileContext } from '@/context/MobileProvider/context'

export const useMobile = () => {
  const { isMobile } = useContext(mobileContext)
  return isMobile
}
