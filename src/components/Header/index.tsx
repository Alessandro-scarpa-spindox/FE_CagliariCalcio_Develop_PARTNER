import React from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { Avatar } from '../Avatar'
import { Text } from '../Text'
import { IconButton } from '../IconButton'
import { Colors } from '@/constants/Colors'

type HeaderProps = {
  withBack?: boolean
}

export const Header = ({ withBack }: HeaderProps) => {
  return (
    <View style={styles.header}>
      {withBack ? (
        <IconButton onPress={() => {}} icon="arrow-back" />
      ) : (
        <Text text="Partners" variant="h3" color="textLight" />
      )}
      <Avatar />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    height: Platform.OS !== 'web' ? 110 : 70,
    zIndex: 1000,
    backgroundColor: Colors.backgroundPrimaryLight,
  },
  header: {
    marginHorizontal: 20,
    backgroundColor: Colors.backgroundPrimaryLight,
    height: 70,
    alignItems: 'center',
    paddingBottom: Platform.OS !== 'web' ? 20 : 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
})
