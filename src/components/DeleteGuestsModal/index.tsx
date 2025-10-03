import { Card } from '@ui-kitten/components'
import { FlowerRule, FlowerRuleProps, useFlowerForm } from '@flowerforce/flower-react'
import { useCallback } from 'react'
import { Modal } from '../Modal'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Button } from '../Button'
import { Colors } from '@/constants/Colors'
import { useModalManager } from '@/hooks/useModalManager'
import { deleteReservation } from '@/api/deleteReservation'
import { useRealmAuth } from '@/hooks/useRealmAuth'

const MODAL_KEY = 'delete-confirm'

type DeleteGuestsModalProps = Omit<FlowerRuleProps, 'children'>

export const DeleteGuestsModal = (props: DeleteGuestsModalProps) => {
  const { closeModal, openModal, isOpen } = useModalManager(MODAL_KEY)
  const { getData, setData, unsetData } = useFlowerForm()
  const { currentUser } = useRealmAuth()

  const deleteCurrentReservation = useCallback(async () => {
    try {
      if (currentUser) {
        const matchId = getData('event.id')
        await deleteReservation(matchId, currentUser.partnerId)
        setData([], 'event.guests')

        unsetData('tempGuests')
      }
    } catch (e) {
      console.log(e)
    } finally {
      closeModal()
    }
  }, [closeModal, getData, setData, currentUser?.partnerId])
  return (
    <FlowerRule {...props}>
      {isOpen ? (
        <Modal modalKey={MODAL_KEY}>
          <Card
            disabled={true}
            style={{
              backgroundColor: Colors.backgroundPrimaryLight,
              borderRadius: 10,
            }}
          >
            <Stack rowGap={20} paddingHorizontal={10}>
              <Text
                variant="h6"
                text="Stai eliminando la prenotazione per questo evento !"
              />
              <Text text="Vuoi confermare?" />
              <Stack flexDirection="row" columnGap={16} justifyContent="flex-end">
                <Button title="Annulla" onPress={closeModal} />
                <Button title="Conferma" onPress={deleteCurrentReservation} />
              </Stack>
            </Stack>
          </Card>
        </Modal>
      ) : (
        <Stack
          justifyContent="center"
          flexDirection="row"
          paddingHorizontal={20}
          paddingBottom={10}
          marginBottom={20}
        >
          <Button title="Elimina prenotazione" onPress={openModal} />
        </Stack>
      )}
    </FlowerRule>
  )
}
