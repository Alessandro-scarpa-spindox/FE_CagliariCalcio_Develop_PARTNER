import { StyleSheet, View } from 'react-native'
import { FlowerValue, FlowerValueProps } from '@flowerforce/flower-react'
import dayjs from 'dayjs'
import { Text } from '../Text'
import { TeamCard } from '../TeamCard'
import { Stack } from '../Stack'
import { teams } from '../../../utils/teams'

type MatchPreviewProps = Omit<FlowerValueProps, 'children'>

export const MatchPreview = ({ id }: MatchPreviewProps) => {
  return (
    <FlowerValue id={id}>
      {({ value }) =>
        value ? (
          <>
            <View style={styles.wrapper}>
              <Text
                text={
                  value.date
                    ? dayjs(value.date).format('ddd, DD MMM YYYY - HH:mm')
                    : 'Da definire'
                }
              />
            </View>

            <View style={styles.info}>
              <Stack rules={() => value.type === 'event'} alignItems="center" gap={16}>
                {teams.cagliari}
                <Text variant="h2" text={value.name} />
                <Text variant="h6" fontWeight={400} text={value.place} />
              </Stack>
              <Stack
                rules={() => value.type !== 'event'}
                flexDirection="row"
                alignItems="center"
                gap={24}
              >
                <TeamCard team="Cagliari" />
                <Text variant="h2" text="-" color="textLight" />
                <TeamCard team={value.opponent ? value.opponent : 'Da definire'} />
              </Stack>
            </View>
          </>
        ) : (
          <></>
        )
      }
    </FlowerValue>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  info: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
})
