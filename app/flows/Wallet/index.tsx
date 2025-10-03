import {
  Flower,
  FlowerAction,
  FlowerNode,
  useFlowerForm,
} from '@flowerforce/flower-react'
import { useRoute } from '@react-navigation/native'
import { useMemo } from 'react'
import { EventPass } from '@/components/EventPass'
import { withBackgroundImage } from '@/hocs/withLayout'
import { useRealmAuth } from '@/hooks/useRealmAuth'
import { GetLoungeData } from '@/components/Actions/GetLoungeData'

export const Wallet = withBackgroundImage(() => {
  const { getData } = useFlowerForm({ flowName: 'matchDetail' })

  const { currentUser } = useRealmAuth()

  const { params }: any = useRoute()

  const ticketInfo = useMemo(() => {
    const event = getData('event')
    return {
      event,
      guest: params?.currentGuest,
      partner: { name: currentUser?.name },
    }
  }, [getData, params?.currentGuest, currentUser])

  return (
    <Flower name="Wallet" initialData={{ ticketInfo }}>
      <FlowerAction id="getLoungeData" to={{ passPreview: null }}>
        <GetLoungeData />
      </FlowerAction>
      <FlowerNode id="passPreview">
        <EventPass />
      </FlowerNode>
    </Flower>
  )
})
