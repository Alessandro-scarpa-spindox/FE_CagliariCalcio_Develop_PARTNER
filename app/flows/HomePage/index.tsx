import { Flower, FlowerNode, FlowerAction } from '@flowerforce/flower-react'
import { EventsList } from '@/components/EventsList'
import { withBackgroundImage } from '@/hocs/withLayout'
import { GetEvents } from '@/components/Actions/GetEvents'

export const HomePage = withBackgroundImage(() => {
  return (
    <Flower name="homePage">
      {/**
       * RECUPERO LISTA EVENTI
       * Download degli eventi da DB
       */}
      <FlowerAction id="getEvents" to={{ home: null }}>
        <GetEvents />
      </FlowerAction>
      <FlowerNode id="home" to={{ goToDetail: null }}>
        <EventsList />
      </FlowerNode>
    </Flower>
  )
})
