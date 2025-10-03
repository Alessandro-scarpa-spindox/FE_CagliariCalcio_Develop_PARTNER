import { Flower, FlowerAction, FlowerNode, FlowerValue } from '@flowerforce/flower-react'
import { useRoute } from '@react-navigation/native'
import { GetPassData } from '@/components/Actions/GetGuestData'
import { EventPass } from '@/components/EventPass'
import { Stack } from '@/components/Stack'
import { Text } from '@/components/Text'

export const ShowEventPass = () => {
  const { params }: any = useRoute()
  const { guestId } = params

  return (
    <Flower name="showEventPass" initialData={{ guestId }}>
      {/**
       * GET EVENT AD GUEST DATA
       * Recupero informazioni
       */}
      <FlowerAction
        id="getGuestData"
        to={{
          showEventPass: 'onSuccess',
          errorShowEventPass: 'onError',
          errorExpiredPass: 'onExpiredError',
        }}
      >
        <GetPassData />
      </FlowerAction>

      {/**
       * SUCCESS SHOW EVENTPASS
       */}
      <FlowerNode id="showEventPass">
        <EventPass guestId={guestId} />
      </FlowerNode>

      {/**
       * ERROR SHOW EVENTPASS
       */}

      <FlowerNode id="errorShowEventPass">
        <Stack
          paddingHorizontal={40}
          paddingVertical={30}
          flexDirection="column"
          justifyContent="center"
          marginHorizontal="auto"
          alignItems="center"
          width={'100%'}
          height={'100%'}
        >
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            width={'100%'}
            marginBottom={30}
            gap={20}
          >
            <Stack width={'90%'}>
              <Text
                text="Errore nella visualizzazione del biglietto."
                variant="h6"
                fontSize={25}
                color="warning"
                marginBottom={20}
                textAlign="center"
              />
              <Text
                text="L'ospite non esiste o il link non è più valido."
                variant="h6"
                fontSize={20}
                marginBottom={20}
                textAlign="center"
              />
            </Stack>
          </Stack>
        </Stack>
      </FlowerNode>

      <FlowerNode id="errorExpiredPass">
        <Stack
          paddingHorizontal={40}
          paddingVertical={30}
          flexDirection="column"
          justifyContent="center"
          marginHorizontal="auto"
          alignItems="center"
          width={'100%'}
          height={'100%'}
        >
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            width={'100%'}
            marginBottom={30}
            gap={20}
          >
            <FlowerValue id="ticketInfo">
              {({ value }) => {
                return (
                  <Stack width={'100%'}>
                    <Stack alignItems="center" justifyContent="center">
                      <Text
                        text={'Il biglietto non è più valido'}
                        variant="h6"
                        fontSize={25}
                        color="warning"
                        marginBottom={20}
                        textAlign="center"
                      />
                    </Stack>

                    <Text
                      text="Questo biglietto era valido per:"
                      variant="h6"
                      fontSize={20}
                      color="textLight"
                      textAlign="center"
                      marginBottom={10}
                    />
                    <Stack gap={10}>
                      <Stack
                        flexDirection="row"
                        gap={5}
                        alignContent="center"
                        justifyContent="center"
                      >
                        <Text
                          text="Evento:"
                          fontWeight={600}
                          variant="h6"
                          fontSize={18}
                        />
                        <Text
                          text={`Cagliari - ${value?.event?.opponent}`}
                          fontSize={18}
                        />
                      </Stack>
                      <Stack
                        flexDirection="row"
                        gap={5}
                        alignContent="center"
                        justifyContent="center"
                      >
                        <Text
                          text="Ospite:"
                          fontWeight={600}
                          variant="h6"
                          fontSize={18}
                        />
                        <Text
                          fontSize={18}
                          text={`${value?.guest?.firstName} ${value?.guest.lastName}`}
                        />
                      </Stack>
                      <Stack
                        flexDirection="row"
                        gap={5}
                        alignContent="center"
                        justifyContent="center"
                      >
                        <Text
                          text="Partner:"
                          fontWeight={600}
                          variant="h6"
                          fontSize={18}
                        />
                        <Text text={`${value?.partner?.name}`} fontSize={18} />
                      </Stack>
                    </Stack>
                  </Stack>
                )
              }}
            </FlowerValue>
          </Stack>
        </Stack>
      </FlowerNode>
    </Flower>
  )
}
