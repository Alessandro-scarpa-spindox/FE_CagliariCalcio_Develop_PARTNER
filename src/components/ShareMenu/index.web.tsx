import React, { useMemo } from 'react'
import { useRoute } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import { IconButton } from '../IconButton'

export const ShareMenu = ({ color }: { color?: string }) => {
  const { params }: Record<string, any> = useRoute()

  const guest = params?.currentGuest

  const fullName = useMemo(() => {
    const name = `${guest?.firstName.replaceAll(' ', '')}${guest?.lastName.replaceAll(' ', '')}`

    return name
  }, [guest])
  const LINK_PARTNER = process.env.EXPO_PUBLIC_REACT_APP_LINK_PARTNER

  const shareOptions = {
    text: 'Cagliari Calcio Guest Pass',
    url: `${LINK_PARTNER}/ticket/${guest?.id}/${fullName}`,
    title: 'Condividi questo pass',
  }

  const onShare = () => {
    if (navigator.share) {
      navigator.share(shareOptions)
    } else {
      Toast.show({
        type: 'error',
        text1: 'Condivisione non supportata!',
        text2: 'Il browser non supporta la condivisione web',
      })
    }
  }

  return <IconButton icon="share-outline" onPress={onShare} fill={color} />
}
