import React from 'react'
import Share from 'react-native-share'
import { IconButton } from '../IconButton'

export const ShareMenu = ({ color }: { color?: string }) => {
  const onShare = () => {
    Share.open({
      title: 'Cagliari Calcio Guest Pass',
      message: 'Condividi questo pass',
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        err && console.log(err)
      })
  }
  return <IconButton icon="share-outline" onPress={onShare} fill={color} />
}
