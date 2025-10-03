import { FlowerValue, useFlowerForm } from '@flowerforce/flower-react'
import { Modal } from '../Modal'
import { Card } from '@ui-kitten/components'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Button } from '../Button'
import { Colors } from '@/constants/Colors'
import React from 'react'
import { LOUNGE_ERROR } from '@/constants/modals'
import { useModalManager } from '@/hooks/useModalManager'
import { checkEventLoungeTotalGuests } from '../../../utils/checkEventLoungeTotalGuests'
import { Guest } from '@/model/Events'
import { Icon } from '../Icon'
import { hexToColor } from '../../../utils/colors'

export const LoungeModal = () => {
  const { getData } = useFlowerForm()
  const { closeModal } = useModalManager(LOUNGE_ERROR)

  const guests: Guest[] = getData('tempGuests') || []

  return (
    <FlowerValue id="eventPartnerSpaces">
      {({ value }) => {
        const spaces = Object.values(checkEventLoungeTotalGuests(value, guests)).filter(
          (space) => space.guests < 0,
        )
        return (
          <Modal modalKey={LOUNGE_ERROR}>
            <Card
              disabled={true}
              style={{
                backgroundColor: Colors.backgroundPrimaryLight,
                borderRadius: 10,
              }}
            >
              <Stack rowGap={25} paddingHorizontal={12}>
                <Text variant="h6" text="Attenzione limite ospiti per lounge superato" />
                <Stack gap={20}>
                  <Text
                    fontWeight={600}
                    text="Hai superato il numero massimo di ospiti disponibili per queste lounge:"
                  />
                  {Object.values(spaces).map((space) => (
                    <Stack
                      flexDirection="row"
                      alignItems="center"
                      gap={5}
                      key={space.name}
                    >
                      <Icon name="radio-button-on" size="16" />
                      <Text
                        text={`${space?.name} - ${hexToColor[space?.color as keyof typeof hexToColor]}`}
                      />
                    </Stack>
                  ))}
                </Stack>
                <Text fontWeight={600} text="Per favore, seleziona lounge differenti." />
                <Stack flexDirection="row" columnGap={16} justifyContent="flex-end">
                  <Button title="Chiudi" onPress={closeModal} />
                </Stack>
              </Stack>
            </Card>
          </Modal>
        )
      }}
    </FlowerValue>
  )
}
