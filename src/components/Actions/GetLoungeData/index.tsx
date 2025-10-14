import { useFlower, useFlowerForm } from '@flowerforce/flower-react'
import { useCallback, useEffect } from 'react'
import { LoadingView } from '@/components/LoadingView'
import { getSpaces } from '@/api/getSpaces'
import { useRealmAuth } from '@/hooks/useRealmAuth'
import { PartnerSpace } from '@/model/Space'

export const GetLoungeData = () => {
  const { next } = useFlower()
  const { getData } = useFlowerForm({ flowName: 'matchDetail' })
  const { setData } = useFlowerForm({ flowName: 'Wallet' })
  const { getData: getWalletData } = useFlowerForm({ flowName: 'Wallet' })
  const { currentUser } = useRealmAuth()
  const getLoungeData = useCallback(async () => {
    try {
      const spaces = await getSpaces('event.id')
      const guestSpaceId = getWalletData('ticketInfo.guest.spaceId')
      const eventSpaces = getData('event.spaces')
      const eventSpacesById: PartnerSpace = getData(
        `event.partners.${currentUser?.partnerId}.spaces`,
      )

      const updatedGuestsSpaces: PartnerSpace = Object.entries(eventSpacesById).reduce(
        (acc, [key, value]) => {
          return {
            ...acc,
            [key]: {
              ...value,
              name: spaces?.find((item) => item.id === key)?.name || '',
              color: eventSpaces[key].color,
            },
          }
        },
        {},
      )
      setData(updatedGuestsSpaces[guestSpaceId].name, 'ticketInfo.guest.nameLounge')
    } catch (e) {
      console.log(e)
    } finally {
      next()
    }
  }, [getWalletData, getData, currentUser?.partnerId, setData, next])

  useEffect(() => {
    getLoungeData()
  }, [getLoungeData])
  return <LoadingView />
}
