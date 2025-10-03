import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native'
import { FlowerValue } from '@flowerforce/flower-react'
import { useCallback } from 'react'
import { EventCard } from '../EventCard'
import { Text } from '../Text'
import { Stack } from '../Stack'
import { sortEvents } from './sortEvents'
import { Header } from './Header'
import { Colors } from '@/constants/Colors'
import { useRealmAuth } from '@/hooks/useRealmAuth'
import { Event } from '@/model/Events'

export const EventsList = () => {
  const { currentUser } = useRealmAuth()
  const { width } = useWindowDimensions()
  const isMobile = width < 700
  const partnerId = currentUser?.partnerId || ''

  const checkIfSpaces = useCallback(
    (events?: Event[]) => {
      return events?.some((event) => {
        return event?.partners?.[partnerId]?.spaces
          ? Object.keys(event.partners[partnerId]?.spaces).length > 0
          : false
      })
    },
    [partnerId],
  )

  return (
    <FlowerValue id="events">
      {({ value = [] }) => {
        const events = sortEvents(value, partnerId)
        const [nextEvent, ...allEvents] = events
        return nextEvent && checkIfSpaces(events) ? (
          <FlatList
            keyExtractor={(_, index) => index.toString()}
            style={styles(isMobile).wrapper}
            data={allEvents}
            ListHeaderComponentStyle={{
              marginVertical: 30,
            }}
            ListHeaderComponent={() => <Header nextEvent={nextEvent} />}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            renderItem={({ item }) =>
              checkIfSpaces(allEvents) ? <EventCard event={item} /> : <Stack></Stack>
            }
          />
        ) : (
          <Stack
            alignItems="center"
            justifyContent="center"
            minHeight={150}
            paddingHorizontal={25}
          >
            <Text
              text="Non sono presenti prossimi eventi"
              variant="h5"
              textAlign="center"
            />
          </Stack>
        )
      }}
    </FlowerValue>
  )
}

const styles = (isMobile: boolean) =>
  StyleSheet.create({
    wrapper: {
      paddingHorizontal: 20,
      marginBottom: 16,
      width: isMobile ? 'auto' : '70%',
      alignSelf: isMobile ? undefined : 'center',
    },
    cardContainer: {
      overflow: 'hidden',
    },
    image: {
      display: 'flex',
      justifyContent: 'center',
      rowGap: 20,
      flex: 1,
      backgroundColor: Colors.backgroundPrimaryLight,
      paddingBottom: 20,
    },
  })
