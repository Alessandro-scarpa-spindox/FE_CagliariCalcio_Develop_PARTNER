import { useFlower, useFlowerForm } from '@flowerforce/flower-react'
import { useCallback, useEffect } from 'react'
import { hexToColor } from '../../../../utils/colors'
import { LoadingView } from '@/components/LoadingView'
import { getSpaces } from '@/api/getSpaces'
import { useRealmAuth } from '@/hooks/useRealmAuth'
import { PartnerSpace } from '@/model/Space'

export const GetSpaces = () => {
  const { next } = useFlower()
  const { getData, setData } = useFlowerForm()
  const { currentUser } = useRealmAuth()

  const getSpacesList = useCallback(async () => {
    try {
      const spaces = await getSpaces('event.id')
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

      const eventsRemapped = Object.keys(updatedGuestsSpaces).map((key) => {
        const name =
          updatedGuestsSpaces[key as keyof typeof updatedGuestsSpaces]?.name || ''
        const color =
          updatedGuestsSpaces[key as keyof typeof updatedGuestsSpaces].color || ''
        return {
          label: `${name ? `${name} - ` : ''}${hexToColor[color as keyof typeof hexToColor]}`,
          value: key,
        }
      })

      setData(spaces, 'spaces')
      setData(eventsRemapped, 'event.spacesById')
      setData(updatedGuestsSpaces, 'eventPartnerSpaces')
      setData(currentUser?.partnerData.maxGuests ?? 0, 'event.maxGuests')
    } catch (e) {
      console.log(e)
      setData([], 'spaces')
    } finally {
      next()
    }
  }, [next, setData, currentUser?.partnerData.maxGuests, getData, currentUser?.partnerId])

  useEffect(() => {
    getSpacesList()
  }, [getSpacesList])
  return <LoadingView />
}
