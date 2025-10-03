import { StyleSheet, View } from 'react-native'
import { Text } from '../Text'
import { Colors } from '@/constants/Colors'

type ReservationsStatusTagProps = {
  canReserve: boolean
}
export const ReservationsStatusTag = ({ canReserve }: ReservationsStatusTagProps) => {
  return (
    <View style={[styles.wrapper, canReserve ? styles.opened : styles.closed]}>
      <Text
        text={canReserve ? 'Prenotazioni aperte' : 'Prenotazioni chiuse'}
        color="backgroundPrimaryLight"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    maxHeight: 30,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    justifyContent: 'center',
  },
  opened: {
    backgroundColor: Colors.success,
  },
  closed: {
    backgroundColor: Colors.warning,
  },
})
