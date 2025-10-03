import { Flower, FlowerAction } from '@flowerforce/flower-react'
import { useRoute } from '@react-navigation/native'
import { withBackgroundImage } from '@/hocs/withLayout'
import { GetConfirmRegistration } from '@/components/Actions/ConfirmRegistration'

export const ConfirmRegistration = withBackgroundImage(() => {
  const { params } = useRoute()
  return (
    <Flower name="ConfirmRegistration" initialData={params}>
      <FlowerAction id="confirmRegistration">
        <GetConfirmRegistration />
      </FlowerAction>
    </Flower>
  )
})
