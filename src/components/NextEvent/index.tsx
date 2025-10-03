import { ImageBackground, StyleSheet, View } from 'react-native'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { Text } from '../Text'
import { Stack } from '../Stack'
import { TeamCard } from '../TeamCard'
import { Countdown } from '../Countdown'
import { ReservationsStatusTag } from '../ReservationsStatusTag'
import { Event } from '@/model/Events'
import { teams } from '../../../utils/teams'

type NextMatchProps = {
  eventInfo: Event
}

export const NextEvent = ({ eventInfo }: NextMatchProps) => {
  const canReserve = useMemo(() => eventInfo.status === 'opened', [eventInfo.status])

  const validOpponent = useMemo(
    () => (eventInfo.opponent ? eventInfo.opponent : 'Da definire'),
    [eventInfo.opponent],
  )
  return (
    <View style={styles.cardContainer}>
      <ImageBackground
        source={require('../../../assets/images/domus.jpg')}
        style={styles.image}
        imageStyle={styles.imageContent}
      >
        <View style={styles.overlay} />
        <Stack width="100%" rowGap={16}>
          <Stack
            flexDirection="row"
            width="100%"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text text="Prossimo Evento" color="textLight" fontSize={16} />
            <ReservationsStatusTag canReserve={canReserve} />
          </Stack>

          <Stack alignItems="center" gap={16}>
            <Text
              text={`${eventInfo.type === 'event' ? eventInfo.name : `${eventInfo.league} ${eventInfo.day ? `- Giornata ${eventInfo.day}` : ''}`}`}
              color="textLight"
              fontWeight={600}
            />
            <Text
              rules={() => eventInfo.type === 'event'}
              text={`${eventInfo.place}`}
              color="textLight"
            />
            <Text
              text={
                eventInfo.date
                  ? dayjs(eventInfo.date).format('ddd, DD MMM YYYY - HH:mm')
                  : 'Da definire'
              }
              color="textLight"
            />
            <Stack
              flexDirection="row"
              gap={32}
              alignItems="center"
              rules={() => eventInfo.type === 'event'}
            >
              {teams?.cagliari}
            </Stack>
            <Stack
              flexDirection="row"
              gap={32}
              alignItems="center"
              rules={() => eventInfo.type === 'competition'}
            >
              <TeamCard team="Cagliari" />
              <Text variant="h2" text="-" color="textLight" />
              <TeamCard team={validOpponent} />
            </Stack>
            <Countdown value={dayjs(eventInfo.date)} />
          </Stack>
        </Stack>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(2, 2, 37, 0.653)', // Colore blu con opacità
    borderRadius: 20,
  },
  cardContainer: {
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    rowGap: 20,
  },
  imageContent: { resizeMode: 'cover' },
})
