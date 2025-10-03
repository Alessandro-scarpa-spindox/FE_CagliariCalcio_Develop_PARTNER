import { FlatList, StyleSheet, useWindowDimensions } from 'react-native'
import {
  FlowerValue,
  FlowerValueProps,
  useFlower,
  useFlowerForm,
} from '@flowerforce/flower-react'
import { useCallback, useMemo } from 'react'
import { Card } from '@ui-kitten/components'
import { GuestCard } from '../GuestCard'
import { Text } from '../Text'
import { IconButton } from '../IconButton'
import { Stack } from '../Stack'
import { Modal } from '../Modal'
import { Button } from '../Button'
import { Guest } from '@/model/Events'
import { Colors } from '@/constants/Colors'
import { useModalManager } from '@/hooks/useModalManager'
import { SENDMAIL_ALLPASSES } from '@/constants/modals'

type GuestsListProps = Omit<FlowerValueProps, 'children'>

export const GuestsList = ({ rules, id }: GuestsListProps) => {
  const { getData, setData } = useFlowerForm()
  const { next } = useFlower()
  const { openModal, closeModal } = useModalManager(SENDMAIL_ALLPASSES)
  const { width } = useWindowDimensions()
  const isMobile = width < 700
  const currentGuests = getData('event.guests')

  const goToEdit = useCallback(() => {
    setData(currentGuests, 'tempGuests')
  }, [currentGuests, setData])

  const sendEmail = () => {
    closeModal()
    next('onSuccess')
  }
  const title = useMemo(() => {
    const maxGuests = getData('maxGuests')
    const eventGuests = getData('event.guests')
    return `(${eventGuests?.length ?? 0}/${maxGuests})`
  }, [getData])

  const checkMail = useCallback(
    (guests: Guest[]) => guests?.filter(({ email }) => email),
    [],
  )

  const subscriberWithEmail = useMemo(
    () => checkMail(currentGuests),
    [checkMail, currentGuests],
  )

  const allEmailSent = useMemo(
    () =>
      subscriberWithEmail?.length > 0 &&
      subscriberWithEmail?.every(
        ({ lastSentTicket }: Record<string, any>) => lastSentTicket,
      ),
    [subscriberWithEmail],
  )

  return (
    <>
      <FlowerValue rules={rules} id={id}>
        {({ value }) => {
          return (
            <Stack>
              <Stack
                justifyContent="space-between"
                flexDirection="row"
                paddingHorizontal={20}
                paddingVertical={10}
                width={isMobile ? null : '70%'}
                alignSelf={isMobile ? undefined : 'center'}
                marginTop={isMobile ? null : 30}
              >
                <Stack
                  flexDirection="row"
                  marginRight={isMobile ? null : 15}
                  alignItems="center"
                  gap={8}
                >
                  <Text variant="h5" text="Lista ospiti" />
                  <Text variant="h6" text={title} />
                </Stack>
                <Stack width={'auto'}>
                  <Stack
                    width={'auto'}
                    gap={isMobile ? 8 : 20}
                    flexDirection="row"
                    marginRight={isMobile ? null : 10}
                  >
                    <IconButton
                      icon={allEmailSent ? 'done-all-outline' : 'email-outline'}
                      rules={({ matchDetail }: Record<string, any>) => {
                        return (
                          matchDetail?.event?.ticket === true &&
                          value?.some(({ email }: Guest) => email) &&
                          isMobile
                        )
                      }}
                      onPress={openModal}
                    />
                    <Button
                      variant="primary"
                      title="Invia ticket mail a tutti"
                      rules={({ matchDetail }: any) => {
                        return (
                          matchDetail?.event.ticket === true &&
                          value?.some(({ email }: Guest) => email) &&
                          !isMobile
                        )
                      }}
                      onPress={openModal}
                    />

                    <IconButton
                      icon="edit"
                      action="next"
                      text={isMobile ? '' : 'Modifica lista'}
                      gap={0}
                      fontSize={16}
                      onPress={goToEdit}
                      rules={{ $and: [{ 'event.status': { $eq: 'opened' } }] }}
                    />
                  </Stack>
                </Stack>
              </Stack>
              <FlatList
                keyExtractor={(_, index) => index.toString()}
                data={value as Guest[]}
                style={styles(isMobile).guestsWrapper}
                renderItem={({ item }) => <GuestCard guest={item} />}
              />
            </Stack>
          )
        }}
      </FlowerValue>
      <Modal modalKey={SENDMAIL_ALLPASSES}>
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
              text={`Vuoi ${
                allEmailSent ? 'inviare di nuovo' : 'inviare'
              } i pass via mail a tutti gli ospiti?`}
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

const styles = (isMobile: boolean) =>
  StyleSheet.create({
    guestsWrapper: {
      paddingTop: 20,
      paddingHorizontal: 20,
      width: isMobile ? null : '70%',
      alignSelf: isMobile ? undefined : 'center',
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
    },
  })
