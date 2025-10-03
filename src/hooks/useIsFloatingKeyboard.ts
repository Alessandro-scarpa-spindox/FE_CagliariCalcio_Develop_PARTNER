import { useState, useEffect } from 'react'
import { Keyboard, Dimensions } from 'react-native'

const useIsFloatingKeyboard = () => {
  const windowWidth = Dimensions.get('window').width

  const [floating, setFloating] = useState(false)

  useEffect(() => {
    const onKeyboardWillChangeFrame = (event: any) => {
      setFloating(event.endCoordinates.width !== windowWidth)
    }

    const list = Keyboard.addListener(
      'keyboardWillChangeFrame',
      onKeyboardWillChangeFrame,
    )
    return () => {
      list.remove()
      //Keyboard.removeListener('keyboardWillChangeFrame', onKeyboardWillChangeFrame);
    }
  }, [windowWidth])

  return floating
}

export default useIsFloatingKeyboard
