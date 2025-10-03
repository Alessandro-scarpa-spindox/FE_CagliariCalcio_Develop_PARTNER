import { useNavigation } from '@react-navigation/native'
import { Pressable } from 'react-native'
import { NextEvent } from '../NextEvent'
import { Event } from '@/model/Events'

type HeaderProps = {
  nextEvent: Event
}
export const Header = ({ nextEvent }: HeaderProps) => {
  const { navigate }: any = useNavigation()
  return (
    <Pressable onPress={() => navigate('MatchDetail', { event: nextEvent })}>
      <NextEvent eventInfo={nextEvent} />
    </Pressable>
  )
}
