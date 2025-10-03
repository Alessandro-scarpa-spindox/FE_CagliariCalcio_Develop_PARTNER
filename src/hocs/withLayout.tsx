import { ImageBackground, StyleSheet } from 'react-native'
import { JSXElementConstructor } from 'react'

const image = require('../../assets/images/loginBg.png')

export const withBackgroundImage = (WrappedComponent: JSXElementConstructor<any>) => {
  const WithLayout = () => {
    return (
      <ImageBackground source={image} style={styles.image} imageStyle={styles.content}>
        <WrappedComponent />
      </ImageBackground>
    )
  }

  return WithLayout
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: '100%',
  },
  content: {
    width: '100%',
    flex: 1,
  },
})
