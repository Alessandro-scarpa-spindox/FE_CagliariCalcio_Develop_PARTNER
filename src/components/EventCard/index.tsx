import { Pressable, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { Text } from '../Text'
import { Stack } from '../Stack'
import { Colors } from '@/constants/Colors'
import { Event } from '@/model/Events'

type EventCardProps = {
  event: Event
}
export const EventCard = ({ event }: EventCardProps) => {
  const { navigate }: any = useNavigation()
  const canReserve = useMemo(() => event.status === 'opened', [event.status])

  const validOpponent = useMemo(
    () => (event.opponent ? event.opponent : 'Da definire'),
    [event.opponent],
  )

  return (
    <Pressable style={styles.card} onPress={() => navigate('MatchDetail', { event })}>
      <Stack flexDirection="row" justifyContent="space-between" width="100%">
        <Text
          text={`${event.type === 'event' ? event.name : `Cagliari - ${validOpponent}`}`}
          color="textLight"
        />
        <Stack flexDirection="row" gap={8} alignItems="center">
          <Text
            text={event.date ? dayjs(event.date).format('DD MMM YYYY') : 'Da definire'}
            color="textLight"
          />
        </Stack>
      </Stack>
      <Stack flexDirection="row" justifyContent="space-between">
        <Text text="Stato prenotazioni: " color="textGrey" />
        <Text
          text={canReserve ? 'Aperte' : 'Chiuse'}
          color={canReserve ? 'success' : 'warning'}
        />
      </Stack>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    padding: 20,
    borderRadius: 10,
    rowGap: 20,
    backgroundColor: Colors.backgroundPrimary,
  },
})
