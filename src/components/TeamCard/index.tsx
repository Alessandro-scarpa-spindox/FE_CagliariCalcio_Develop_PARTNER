import { StyleSheet, View } from 'react-native'
import { teams } from '../../../utils/teams'
import { Text } from '../Text'

type TeamCardProps = {
  team: string
}
export const TeamCard = ({ team }: TeamCardProps) => {
  return (
    <View style={styles.card}>
      {teams?.[team.toLowerCase()?.replaceAll(' ', '') as keyof typeof teams] ??
        teams.default}
      <Text variant="h6" text={team} color="textLight" />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    rowGap: 12,
    alignItems: 'center',
  },
})
