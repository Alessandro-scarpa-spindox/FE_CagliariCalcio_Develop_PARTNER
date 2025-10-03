import { StyleSheet, View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'
import React, { useCallback } from 'react'
import { Layout, MenuItem, OverflowMenu as KOverflowMenu } from '@ui-kitten/components'
import { useNavigation } from 'expo-router'
import { Text } from '../Text'
import { Colors } from '@/constants/Colors'
import { useRealmAuth } from '@/hooks/useRealmAuth'

type Props = {
  style?: StyleProp<ViewStyle>
}
export const Avatar = ({ style }: Props) => {
  const { currentUser } = useRealmAuth()

  const button = (
    <View style={[styles.avatar, style]}>
      <Text
        variant="h4"
        text={currentUser?.partnerData.name?.[0] || 'P'}
        color="textLight"
      />
    </View>
  )
  return <OverflowMenu button={button} />
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: Colors.backgroundSecondary,
    width: 40,
    height: 40,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  container: {
    backgroundColor: '#0B264B',
    marginHorizontal: 10,
  },
})

export const OverflowMenu = ({ button }: any): React.ReactElement => {
  const [visible, setVisible] = React.useState(false)
  const { logoutUser } = useRealmAuth()
  const { navigate }: any = useNavigation()
  const renderToggleButton = (): React.ReactElement => (
    <TouchableOpacity onPress={() => setVisible(true)}>{button}</TouchableOpacity>
  )

  const goToAccountInfo = useCallback(() => {
    navigate('Account')
    setVisible(false)
  }, [navigate])

  return (
    <Layout style={styles.container} level="1">
      <KOverflowMenu
        anchor={renderToggleButton}
        visible={visible}
        onBackdropPress={() => setVisible(false)}
        style={{ backgroundColor: '#FFF' }}
      >
        <MenuItem title="Info account" onPress={goToAccountInfo} />
        <MenuItem title="Logout" onPress={logoutUser} />
      </KOverflowMenu>
    </Layout>
  )
}
