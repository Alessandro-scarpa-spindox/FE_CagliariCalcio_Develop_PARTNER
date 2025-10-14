import {
  Flower,
  FlowerNode,
  FlowerValue,
  FlowerAction,
  useFlowerForm,
  useFlower,
} from '@flowerforce/flower-react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card } from '@ui-kitten/components'
import { ScrollView, useWindowDimensions } from 'react-native'
import { useCallback, useEffect, useRef } from 'react'
import { AnimatedScrollView } from 'react-native-reanimated/lib/typescript/reanimated2/component/ScrollView'
import { Text } from '@/components/Text'
import { Stack } from '@/components/Stack'
import { Countdown } from '@/components/Countdown'
import { Icon } from '@/components/Icon'
import { GuestsList } from '@/components/GuestsList'
import { MatchPreview } from '@/components/MatchPreview'
import { Button } from '@/components/Button'
import { GuestsEdit } from '@/components/GuestsEdit'
import { EventPass } from '@/components/EventPass'
import { withBackgroundImage } from '@/hocs/withLayout'
import { GetEventReservationsByPartner } from '@/components/Actions/GetEventReservationsByPartner'
import { EventDetailHeader } from '@/components/EventDetailHeader'
import { GetSpaces } from '@/components/Actions/GetSpaces'
import { CheckIsReservationEnabled } from '@/components/Actions/CheckIsReservationEnabled'
import { useRealmAuth } from '@/hooks/useRealmAuth'
import CheckEventExists from '@/components/Actions/CheckEventExists'
import { LoungeModal } from '@/components/LoungeModal'
import { useModalManager } from '@/hooks/useModalManager'
import { LOUNGE_ERROR, MAXGUEST_ERROR, PREVEVENTGUEST_CONFIRM } from '@/constants/modals'
import { CheckGuestsLounge } from '@/components/Actions/CheckGuestsLounge'
import { GuestsEventHeader } from '@/components/GuestsEventHeader'
import { GetGuestsPreviousEvent } from '@/components/Actions/GetGuestsPreviousEvent'
import { Modal } from '@/components/Modal'
import { Colors } from '@/constants/Colors'
import GetPreviousEventData from '@/components/Actions/GetPreviousEventData'
import { SendTicketsByEmail } from '@/components/Actions/SendTicketsByEmail'
import { Guest } from '@/model/Events'
import UpsertGuests from '@/components/Actions/UpsertGuests'
import DeleteGuests from '@/components/Actions/DeleteGuests'
import { GetReservations } from '@/components/Actions/GetReservations'
import { watchEventChanges } from '@/api/checkIsReservationEnabled'

export const MatchDetail = withBackgroundImage(() => {
  const { next } = useFlower({ flowName: 'matchDetail' })
  const { getData, setData } = useFlowerForm({ flowName: 'matchDetail' })
  const { params }: Record<string, any> = useRoute()
  const { event } = params || {}
  const { currentUser } = useRealmAuth()
  const { navigate }: any = useNavigation()
  const { isOpen } = useModalManager(LOUNGE_ERROR)
  const { isOpen: isPrevEventOpen, closeModal } = useModalManager(MAXGUEST_ERROR)
  const { width } = useWindowDimensions()
  const { openModal: openGuestsModal, closeModal: closeGuestsModal } =
    useModalManager(PREVEVENTGUEST_CONFIRM)
  const isMobile = width < 700
  const prevReservations: Guest[] = getData('prevReservations')

  const maxGuests: number = event.partners?.[currentUser?.partnerId || '']?.guests || 0
  const scrollViewRef = useRef<AnimatedScrollView>(null)

  const confirmPreviousGuests = useCallback(() => {
    next('onGetPrevious')
    closeGuestsModal()
  }, [next, closeGuestsModal])

  useEffect(() => {
    const onClose = watchEventChanges(event.id, (change: any) => {
      const { status, ticket } = change.fullDocument
      setData(status, 'event.status')
      setData(ticket, 'event.ticket')
    })
    return () => {
      onClose.then((callback) => callback())
    }
  }, [event, setData])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Flower
        name="matchDetail"
        initialData={{
          event,
          maxGuests,
        }}
      >
        {/**
         * GET RESERVATIONS
         * Recupero informazioni prenotazione in base a evento e partner
         */}
        <FlowerAction id="initialNode" to={{ getReservations: null }}>
          <GetReservations />
        </FlowerAction>

        <FlowerAction id="getReservations" to={{ checkReservationStatus: null }}>
          <GetEventReservationsByPartner />
        </FlowerAction>

        {/**
         * CHECK RESERVATION STATUS
         * Verifico lo stato delle prenotazioni
         */}
        <FlowerAction
          id="checkReservationStatus"
          to={{ eventDetail: null, checkEvent: null }}
        >
          <CheckIsReservationEnabled />
        </FlowerAction>

        {/**
         * MATCH DETAIL
         * Visualizzazione del dettaglio di un match
         */}
        <FlowerNode
          id="eventDetail"
          to={{ getSpaces: null, sendTicketsByEmail: 'onSuccess' }}
        >
          <EventDetailHeader id="event" />
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Stack
              paddingHorizontal={40}
              paddingVertical={30}
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              width={'100%'}
            >
              <Stack
                flexDirection="row"
                alignItems="center"
                gap={10}
                width={isMobile ? '100%' : '70%'}
                marginBottom={isMobile ? 20 : 40}
              >
                <Stack width={isMobile ? '100%' : '70%'}>
                  <Text
                    text="Al momento non è possibile inserire gli ospiti"
                    variant="h6"
                    color="warning"
                    rules={{
                      $and: [
                        { 'event.status': { $eq: 'closed' } },
                        { 'event.guests': { $lt: 1 } },
                      ],
                    }}
                  />
                  <Text
                    text="Al momento non è possibile modificare gli ospiti"
                    variant="h6"
                    color="warning"
                    rules={{
                      $and: [
                        { 'event.status': { $eq: 'closed' } },
                        { 'event.guests': { $gte: 1 } },
                      ],
                    }}
                  />
                  <Text
                    text="Prenotazione inserita"
                    variant="h6"
                    color="success"
                    rules={{
                      $and: [
                        { 'event.status': { $eq: 'opened' } },
                        { 'event.guests': { $gte: 1 } },
                      ],
                    }}
                  />
                </Stack>
                <Stack width={'10%'}>
                  <Icon
                    name="checkmark-circle-2"
                    colorKey="success"
                    size="18"
                    rules={{
                      $and: [
                        { 'event.status': { $eq: 'opened' } },
                        { 'event.guests': { $gte: 1 } },
                      ],
                    }}
                  />
                  <Icon
                    name="clock"
                    colorKey="warning"
                    size="18"
                    rules={{ $and: [{ 'event.status': { $eq: 'closed' } }] }}
                  />
                </Stack>
              </Stack>
              <FlowerValue
                id="event.date"
                rules={{ $and: [{ 'event.date': { $exists: true } }] }}
              >
                <Countdown variant="styled" />
              </FlowerValue>
              <MatchPreview id="event" />
            </Stack>
            <GuestsList
              id="event.guests"
              rules={{ $and: [{ 'event.guests': { $gte: 1 } }] }}
            />
            {maxGuests > 0 ? (
              <Stack
                paddingHorizontal={20}
                rules={{
                  $and: [
                    { 'event.status': { $eq: 'opened' } },
                    { 'event.guests': { $lte: 0 } },
                  ],
                }}
                width={isMobile ? null : '40%'}
                marginTop={isMobile ? null : 40}
                alignSelf={isMobile ? undefined : 'center'}
              >
                <Button action="next" title="Inserisci ospiti" />
              </Stack>
            ) : (
              <Stack
                paddingHorizontal={20}
                justifyContent="center"
                alignItems="center"
                rules={{
                  $and: [{ 'event.status': { $eq: 'opened' } }],
                }}
              >
                <Text
                  text="Non hai posti a disposizione"
                  fontSize={20}
                  fontWeight={600}
                />
              </Stack>
            )}
          </ScrollView>
        </FlowerNode>

        {/**
         * GET SPACES
         * Recupero tutti gli spazi
         */}
        <FlowerAction id="getSpaces" to={{ getPrevEventData: null }}>
          <GetSpaces />
        </FlowerAction>

        <FlowerAction id="getPrevEventData" to={{ formGuests: null }}>
          <GetPreviousEventData />
        </FlowerAction>

        {/**
         * EDIT OSPITI
         * Form di inserimento o modifica lista ospiti
         */}
        <FlowerNode
          id="formGuests"
          retain
          to={{
            checkEventPartnerLounge: 'onSave',
            getGuestsPreviousEvent: 'onGetPrevious',
          }}
        >
          <FlowerValue id="tempGuests">
            {({ value = [] }) => (
              <Stack>
                <GuestsEventHeader
                  guestsNumber={value.length}
                  maxGuests={maxGuests}
                  title={`Lista Ospiti (${value.length}/ ${maxGuests})`}
                  id="tempGuests"
                />
                {value.length > maxGuests && (
                  <Stack
                    backgroundColor={Colors.backgroundSecondary}
                    minHeight={35}
                    alignItems="center"
                    paddingHorizontal={12}
                    paddingVertical={12}
                  >
                    <Text
                      text={`Limite massimo ospiti superato. Numero ospiti da eliminare: ${value.length - maxGuests}`}
                    />
                  </Stack>
                )}
                {value?.length < maxGuests && prevReservations?.length > 0 && (
                  <Stack
                    rules={{
                      $and: [
                        {
                          tempGuests: {
                            $lt: `$ref:event.partners.${currentUser!.partnerId}.guests`,
                          },
                        },
                      ],
                    }}
                  >
                    <Button
                      icon="plus-circle-outline"
                      variant="tertiary"
                      title="Aggiungi ospiti da evento precedente"
                      onPress={openGuestsModal}
                    />
                    <Modal modalKey={PREVEVENTGUEST_CONFIRM}>
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
                            text="Aggiungere gli ospiti dall'evento precedente?"
                          />

                          <Button title="Conferma" onPress={confirmPreviousGuests} />
                          <Stack>
                            <Button
                              variant="secondary"
                              title="Chiudi"
                              onPress={closeGuestsModal}
                            />
                          </Stack>
                        </Stack>
                      </Card>
                    </Modal>
                  </Stack>
                )}
              </Stack>
            )}
          </FlowerValue>
          <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current?.scrollToEnd({ animated: true })
            }
          >
            <GuestsEdit />
          </ScrollView>
          {isOpen && <LoungeModal />}
          {isPrevEventOpen && (
            <FlowerValue id="tempGuests">
              {({ value = [] }) => (
                <Modal modalKey={MAXGUEST_ERROR}>
                  <Card
                    disabled={true}
                    style={{
                      backgroundColor: Colors.backgroundPrimaryLight,
                      borderRadius: 10,
                    }}
                  >
                    <Stack rowGap={25} paddingHorizontal={12}>
                      <Text variant="h6" text="Attenzione limite ospiti superato" />
                      <Stack gap={20}>
                        <Text
                          fontWeight={600}
                          text="Hai superato il numero massimo di ospiti disponibili."
                        />
                        <Text
                          text={`Per favore rimuovi ${value.length - maxGuests} ospit${value.length - maxGuests < 1 ? 'e' : 'i'}`}
                        />
                      </Stack>

                      <Button title="Chiudi" onPress={closeModal} />
                    </Stack>
                  </Card>
                </Modal>
              )}
            </FlowerValue>
          )}
        </FlowerNode>

        <FlowerAction id="checkEventPartnerLounge" to={{ checkEventExists: null }}>
          <CheckGuestsLounge />
        </FlowerAction>

        <FlowerAction id="getGuestsPreviousEvent">
          <GetGuestsPreviousEvent />
        </FlowerAction>

        <FlowerAction
          id="checkEventExists"
          to={{
            errorCheckEventExists: 'onError',
            addReservations: 'onAddReservations',
            QRCODE: { rules: { $and: [{ event: { $exists: true } }] } },
          }}
        >
          <CheckEventExists />
        </FlowerAction>

        <FlowerNode
          id="addReservations"
          to={{
            deleteReservations: null,
            maxGuestError: 'onError',
            errorMaxGuests: 'onMaxGuestsError',
          }}
        >
          <UpsertGuests />
        </FlowerNode>

        <FlowerNode id="deleteReservations">
          <DeleteGuests />
        </FlowerNode>

        <FlowerNode id="QRCODE">
          <EventPass />
        </FlowerNode>

        <FlowerAction id="sendTicketsByEmail">
          <SendTicketsByEmail />
        </FlowerAction>

        <FlowerNode id="errorCheckEventExists">
          <Stack
            paddingHorizontal={40}
            paddingVertical={30}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width={'100%'}
            height={'100%'}
          >
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              width={'100%'}
              marginBottom={30}
              gap={20}
            >
              <Stack width={'90%'}>
                <Text
                  text="Si è verificato un errore nella modifica dell'evento. Per favore riprova più tardi."
                  variant="h6"
                  textAlign="center"
                  color="warning"
                  margin={20}
                />
                <Stack>
                  <Button title="Torna alla home" onPress={() => navigate('HomePage')} />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </FlowerNode>

        <FlowerNode id="errorMaxGuests">
          <Stack
            paddingHorizontal={40}
            paddingVertical={30}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width={'100%'}
            height={'100%'}
          >
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              width={'100%'}
              marginBottom={30}
              gap={20}
            >
              <Stack width="100%">
                <Text
                  text={`ATTENZIONE!\n Il numero di ospiti inserito supera il limite massimo per l'evento.\nPer favore, riprova.`}
                  variant="h6"
                  textAlign="center"
                  color="warning"
                  margin={20}
                />

                <Stack marginTop={10}>
                  <Button title="Torna alla home" onPress={() => navigate('HomePage')} />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </FlowerNode>

        <FlowerNode id="maxGuestError">
          <Stack
            paddingHorizontal={40}
            paddingVertical={30}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width={'100%'}
            height={'100%'}
          >
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              width={'100%'}
              marginBottom={30}
              gap={20}
            >
              <Stack width={'90%'}>
                <Text
                  text="Si è verificato un errore nella modifica degli ospiti."
                  variant="h6"
                  textAlign="center"
                  color="warning"
                  margin={20}
                />
                <Stack>
                  <Button title="Torna alla home" onPress={() => navigate('HomePage')} />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </FlowerNode>
      </Flower>
    </SafeAreaView>
  )
})
