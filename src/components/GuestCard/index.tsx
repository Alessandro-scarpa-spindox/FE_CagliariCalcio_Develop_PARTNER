import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'
import { useCallback } from 'react'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { IconButton } from '../IconButton'
import { Colors } from '@/constants/Colors'
import { Guest } from '@/model/Events'
import { getSpaceById } from '@/api/getSpaceById'
import { getEventDetail } from '@/api/getEventData'
import { useModalManager } from '@/hooks/useModalManager'
import { SENDMAIL_SINGLEPASS } from '@/constants/modals'
import { Modal } from '../Modal'
import { Card } from '@ui-kitten/components'
import { Button } from '../Button'
import { useFlower, useFlowerForm } from '@flowerforce/flower-react'

type GuestProps = {
  guest: Guest
}

type Spaces = {
  color: string
}
export const GuestCard = ({ guest }: GuestProps) => {
  const { navigate }: any = useNavigation()
  const { next } = useFlower()
  const { setData, getData } = useFlowerForm()
  const { openModal, closeModal } = useModalManager(SENDMAIL_SINGLEPASS)

  const singleTicket = getData('sentSingleTicket')

  const onPress = useCallback(async () => {
    const space = await getSpaceById(guest.spaceId)
    const event = await getEventDetail(guest.eventId)
    const spaces = event.spaces as unknown as Record<string, Spaces>
    navigate('Wallet', {
      currentGuest: {
        ...guest,
        color: spaces[guest.spaceId].color || space?.color,
      },
    })
  }, [guest, navigate])

  const selectReceiver = useCallback(() => {
    openModal()
    setData(guest, `sentSingleTicket`)
  }, [setData, openModal])

  const sendEmail = useCallback(() => {
    closeModal()
    next('onSuccess')
  }, [guest])

  return (
    <>
      <View style={styles.card}>
        <Stack gap={4}>
          <Stack flexDirection="row" gap={4} alignItems="center">
            <Text text="Nome:" />
            <Text text={guest.firstName} />
          </Stack>
          <Stack flexDirection="row" gap={4} alignItems="center">
            <Text text="Cognome:" />
            <Text text={guest.lastName} />
          </Stack>
          <Stack flexDirection="row" gap={4} alignItems="center">
            <Text text="Data di nascita:" />
            <Text text={guest?.birthDate?.toString()} />
          </Stack>
        </Stack>
        <Stack flexDirection="row" gap={5}>
          <IconButton
            icon="file"
            rules={{
              $and: [
                {
                  'event.ticket': { $eq: true },
                },
              ],
            }}
            onPress={onPress}
          />

          {guest.email && (
            <IconButton
              icon={guest.lastSentTicket ? 'done-all-outline' : 'email-outline'}
              rules={{
                $and: [
                  {
                    'event.ticket': { $eq: true },
                  },
                ],
              }}
              onPress={selectReceiver}
            />
          )}
        </Stack>
      </View>
      <Modal modalKey={SENDMAIL_SINGLEPASS}>
        <Card
          disabled={true}
          style={{
            backgroundColor: Colors.backgroundPrimaryLight,
            borderRadius: 10,
          }}
        >
          <Stack rowGap={25} paddingHorizontal={12} paddingVertical={12}>
            <Text
              variant="h6"
              text={`${singleTicket?.lastSentTicket ? 'Inviare di nuovo' : 'Inviare'} il pass di ${singleTicket?.firstName} ${singleTicket?.lastName} alla mail ${singleTicket?.email} ?`}
            />

            <Button title="Conferma" onPress={sendEmail} />
            <Stack>
              <Button variant="secondary" title="Chiudi" onPress={closeModal} />
            </Stack>
          </Stack>
        </Card>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.backgroundPrimary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 15,
    borderRadius: 8,
    paddingHorizontal: 20,
    /* shadowColor: '#ffffff13',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 10,
    shadowRadius: 5, */
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    marginBottom: 25,
  },
})
