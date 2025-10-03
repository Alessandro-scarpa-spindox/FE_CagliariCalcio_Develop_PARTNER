import { getPartner } from '@/api/getPartner'
import { LoadingView } from '@/components/LoadingView'
import { useFlower, useFlowerForm } from '@flowerforce/flower-react'
import { useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect } from 'react'

export const GetPartnerData = () => {
  const { params }: Record<string, any> = useRoute()

  const { next } = useFlower()
  const { setData } = useFlowerForm()

  const onGetPartnerData = useCallback(async () => {
    const { tokenId } = params

    try {
      const partner = await getPartner(tokenId)

      if (!partner) {
        return next('onError')
      }

      setData(
        {
          tokenId,
          ...partner,
        },
        'partnerData',
      )
      next('onSuccess')
    } catch (error) {
      next('onError')
    }
  }, [next, setData])

  useEffect(() => {
    onGetPartnerData()
  }, [onGetPartnerData])

  return <LoadingView />
}
