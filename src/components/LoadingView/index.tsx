import { ActivityIndicator, ImageBackground, StyleSheet } from 'react-native'
import { Colors } from '@/constants/Colors'

export const LoadingView = () => {
  return (
    <ImageBackground
      source={require('../../../assets/images/loginBg.png')}
      style={styles.image}
    >
      <ActivityIndicator size="small" color={Colors.textLight} />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  image: {
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
    rowGap: 20,
    flex: 1,
  },
})
