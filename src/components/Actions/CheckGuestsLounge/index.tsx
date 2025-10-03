import { useFlower, useFlowerForm } from '@flowerforce/flower-react'
import React, { useCallback, useEffect } from 'react'
import { checkEventLoungeTotalGuests } from '../../../../utils/checkEventLoungeTotalGuests'
import { LoadingView } from '@/components/LoadingView'
import { LOUNGE_ERROR } from '@/constants/modals'
import { useModalManager } from '@/hooks/useModalManager'
import { Guest } from '@/model/Events'
import { PartnerSpace } from '@/model/Space'

export const CheckGuestsLounge = () => {
  const { next, back } = useFlower()
  const { getData } = useFlowerForm()
  const { openModal } = useModalManager(LOUNGE_ERROR)

  const onCheckGuestsLounge = useCallback(() => {
    const guests: Guest[] = getData('tempGuests') || []
    const eventPartnerSpaces: PartnerSpace = getData('eventPartnerSpaces')

    const tempSpaces = checkEventLoungeTotalGuests(eventPartnerSpaces, guests)

    if (Object.values(tempSpaces)?.some((item) => item.guests < 0)) {
      openModal()
      return back()
    }

    next()
  }, [next, back, getData, openModal])

  useEffect(() => {
    onCheckGuestsLounge()
  }, [onCheckGuestsLounge])

  return <LoadingView />
}
