import { FlowerValue, FlowerValueProps } from '@flowerforce/flower-react'
import { Avatar } from '../Avatar'
import { PageHeader } from '../PageHeader'

type Props = Omit<FlowerValueProps, 'children'>

export const EventDetailHeader = ({ id }: Props) => {
  return (
    <FlowerValue id={id}>
      {({ value }) => (
        <PageHeader
          title={`${value.type === 'event' ? 'Evento speciale' : `${value.league} ${value.day ? `- Giornata ${value.day}` : ''}`} `}
          rightRender={<Avatar />}
        />
      )}
    </FlowerValue>
  )
}
