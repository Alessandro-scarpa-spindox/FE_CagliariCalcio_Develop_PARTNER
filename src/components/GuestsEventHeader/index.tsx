import {
  FlowerValue,
  FlowerValueProps,
  useFlower,
  useFlowerForm,
} from '@flowerforce/flower-react'
import React from 'react'
import { PageHeader } from '../PageHeader'
import { GuestsHeader } from '../GuestsEdit/header'
import { Guest } from '@/model/Events'
import { PartnerSpace } from '@/model/Space'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { hexToColor } from '../../../utils/colors'
import { useWindowDimensions } from 'react-native'

type Props = { title: string; maxGuests: number; guestsNumber: number } & Omit<
  FlowerValueProps,
  'children'
>

type HeaderSpaces = { color: string; name?: string; guests: number }[]

export const GuestsEventHeader = ({ id, title }: Props) => {
  const { getData } = useFlowerForm()
  const partnerSpaces: PartnerSpace = getData('eventPartnerSpaces')
  const { width } = useWindowDimensions()
  const isMobile = width < 700
  return (
    <FlowerValue id={id}>
      {({ value = [] }) => {
        const tempSpaces: HeaderSpaces = partnerSpaces
          ? Object?.entries(partnerSpaces).reduce(
              (acc: HeaderSpaces, [spaceKey, spaceValue]) => {
                const spaceGuests = value?.filter(
                  (guest: Guest) => guest.spaceId === spaceKey,
                )
                const totalGuests = spaceValue.guests - spaceGuests.length
                return [...acc, { ...spaceValue, guests: totalGuests }]
              },
              [],
            )
          : []

        return (
          <PageHeader title={title} rightRender={<GuestsHeader />} backNode="initialNode">
            {tempSpaces &&
              tempSpaces.map((space, i) => (
                <Stack key={i} flexDirection="column">
                  <Stack
                    width={isMobile ? '100%' : '60%'}
                    flexDirection="row"
                    alignItems="center"
                    alignSelf={isMobile ? undefined : 'center'}
                  >
                    <Text
                      fontWeight={600}
                      text={`${space.name} - ${hexToColor[space.color as keyof typeof hexToColor]}`}
                    />
                    {space.guests > -1 ? (
                      <Text text={` (Tot. posti: ${space.guests})`} />
                    ) : (
                      <Text
                        fontSize={14}
                        text={`Posti superati`}
                        color="warning"
                        marginLeft={12}
                      />
                    )}
                  </Stack>
                </Stack>
              ))}
            {/*   {tempSpaces &&
              tempSpaces.map((s, i) => (
                <Stack key={i}>
                  {s.guests < 0 && (
                    <Text
                      fontSize={16}
                      text={`Numero ospiti per lounge ${s.name} superato`}
                      color="error"
                    />
                  )}
                </Stack>
              ))} */}
          </PageHeader>
        )
      }}
    </FlowerValue>
  )
}
