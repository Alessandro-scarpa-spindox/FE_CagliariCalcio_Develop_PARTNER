import { Pressable, StyleSheet } from 'react-native'
import { Path, Svg } from 'react-native-svg'
import { useCallback } from 'react'
import { Stack } from '../Stack'
import { Text } from '../Text'

export const WalletButton = () => {
  const addToAppleWallet = useCallback(() => {
    console.log('add to wallet')
  }, [])
  return (
    <Pressable style={styles.button} onPress={addToAppleWallet}>
      {Icon}
      <Stack>
        <Text text="Add to" fontSize={15} />
        <Text text="Google Wallet" fontSize={18} />
      </Stack>
    </Pressable>
  )
}

const Icon = (
  <Svg width={29} height={26} viewBox="0 0 29 26">
    <Path
      d="M29 9.63H0V4.815C0 2.167 2.105 0 4.677 0h19.646C26.895 0 29 2.167 29 4.815V9.63z"
      fill="#34A853"
    />
    <Path
      d="M29 13.722H0V8.907c0-2.648 2.105-4.814 4.677-4.814h19.646C26.895 4.093 29 6.259 29 8.907v4.815z"
      fill="#FB0"
    />
    <Path
      d="M29 17.815H0V13c0-2.648 2.105-4.815 4.677-4.815h19.646C26.895 8.185 29 10.352 29 13v4.815z"
      fill="#FE2C25"
    />
    <Path
      d="M0 10.785l18.406 4.526c2.175.53 4.49.048 6.267-1.348L29 10.593v10.592C29 23.833 26.895 26 24.323 26H4.677C2.105 26 0 23.833 0 21.185v-10.4z"
      fill="#4285F4"
      fillRule="evenodd"
    />
  </Svg>
)

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000',
    width: 200,
    height: 55,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    columnGap: 10,
  },
})
