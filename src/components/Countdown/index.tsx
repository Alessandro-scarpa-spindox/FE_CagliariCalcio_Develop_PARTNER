import dayjs, { Dayjs } from 'dayjs'
import { StyleSheet, View } from 'react-native'
import { memo, useMemo } from 'react'
import { Text } from '../Text'
import { Stack } from '../Stack'
import { Icon } from '../Icon'
import { useCountdown } from '@/hooks/useCountDown'
import { Colors } from '@/constants/Colors'

type CountdownProps = {
  value?: Dayjs
  variant?: 'minimal' | 'styled'
}
const _Countdown = ({ value, variant = 'minimal' }: CountdownProps) => {
  const currentDate = useMemo(() => {
    if (value?.isValid?.()) {
      return value
    }
    return dayjs(value)
  }, [value])
  const isStyled = variant === 'styled'
  const { countdown, isLive } = useCountdown(currentDate)

  if (!countdown) return null
  return isLive ? (
    <Stack flexDirection="row" gap={16} justifyContent="center" alignItems="center">
      <Text text="LIVE" color="success" />
      <Icon name="radio-button-on" colorKey="success" />
    </Stack>
  ) : (
    <Stack flexDirection="row" gap={16} justifyContent="center">
      {countdown.map((value, index) => (
        <View key={index} style={[styles.box, isStyled && styles.custom]}>
          {value >= 0 ? (
            <>
              <Text
                variant={isStyled ? 'h5' : 'h6'}
                text={value.toString()}
                color="textLight"
              />
              <Text text={LABELS_BY_INDEX[index]} color="textLight" />
            </>
          ) : (
            <></>
          )}
        </View>
      ))}
    </Stack>
  )
}

export const Countdown = memo(_Countdown)

const styles = StyleSheet.create({
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  custom: {
    height: 70,
    width: 70,
    backgroundColor: Colors.backgroundPrimary,
    borderRadius: 10,
    shadowColor: '#fcfcfc8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 5,
    shadowRadius: 4,
  },
})

const LABELS_BY_INDEX = ['giorni', 'ore', 'minuti', 'secondi']
