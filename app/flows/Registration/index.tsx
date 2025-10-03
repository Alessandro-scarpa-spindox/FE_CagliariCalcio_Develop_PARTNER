import { Flower, FlowerAction, FlowerNode } from '@flowerforce/flower-react'
import { ImageBackground, StyleSheet, ScrollView, View } from 'react-native'
import { useNavigation } from 'expo-router'
import { Card } from '@ui-kitten/components'
import { withBackgroundImage } from '@/hocs/withLayout'
import { RegistrationForm } from '@/components/RegistrationForm'
import { RegisterPartner } from '@/components/Actions/RegisterPartner'
import { GetPartnerData } from '@/components/Actions/GetPartnerData'
import { Stack } from '@/components/Stack'
import { Logo } from '@/components/Logo'
import { Text } from '@/components/Text'
import { Button } from '@/components/Button'
import { LoginNewPartner } from '@/components/Actions/LoginNewPartner'
import { useModalManager } from '@/hooks/useModalManager'
import { PRIVACY_CONSENT } from '@/constants/modals'
import { Modal } from '@/components/Modal'
import { Colors } from '@/constants/Colors'
import InfoPrivacy from '@/components/InfoPrivacy'

export const Registration = withBackgroundImage(() => {
  const { navigate }: any = useNavigation()
  const { closeModal } = useModalManager(PRIVACY_CONSENT)

  return (
    <Flower name="Registration">
      <FlowerAction
        id="getPartnerData"
        to={{ registration: 'onSuccess', registrationError: 'onError' }}
      >
        <GetPartnerData />
      </FlowerAction>

      <FlowerNode id="registration" to={{ privacy: null }} retain>
        <ImageBackground
          source={require('../../../assets/images/loginBg.png')}
          style={styles.image}
          imageStyle={styles.bgContent}
        >
          <ScrollView>
            <Stack
              alignItems="center"
              justifyContent="center"
              transform="translateY(30px)"
            >
              <Logo size={130} hasOpacity />
              <Stack alignItems="center" rowGap={16} marginBottom={20}>
                <Text color="textLight" text="Registrazione" variant="h1" fontSize={26} />
              </Stack>
            </Stack>
            <RegistrationForm />
            <Stack
              alignItems="center"
              justifyContent="center"
              transform="translateY(20px)"
            >
              <Text variant="h6" text="Cagliari Calcio Partners" />
            </Stack>
          </ScrollView>
        </ImageBackground>
      </FlowerNode>

      <FlowerAction id="privacy" to={{ registerPartner: null }}>
        <Modal modalKey={PRIVACY_CONSENT}>
          <Card
            disabled={true}
            style={{
              backgroundColor: Colors.backgroundPrimaryLight,
              borderRadius: 10,
              maxHeight: 500,
            }}
          >
            <Stack flex={1} gap={20}>
              <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <InfoPrivacy />
              </ScrollView>
              <View>
                <Stack gap={20}>
                  <Button
                    variant="secondary"
                    action="back"
                    title={'Chiudi'}
                    onPress={closeModal}
                    alwaysDisplay
                  />
                </Stack>
              </View>
            </Stack>
          </Card>
        </Modal>
      </FlowerAction>

      <FlowerAction
        id="registerPartner"
        to={{ loginNewPartner: 'onSuccess', registrationError: 'onError' }}
      >
        <RegisterPartner />
      </FlowerAction>

      <FlowerAction id="loginNewPartner" to={{ registrationError: 'onError' }}>
        <LoginNewPartner />
      </FlowerAction>

      <FlowerNode id="registrationError">
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
            justifyContent="space-between"
            width={'100%'}
            marginBottom={30}
            gap={20}
          >
            <Stack width={'90%'}>
              <Text
                text="Si è verificato un errore nella registrazione del partner."
                variant="h6"
                textAlign="center"
                color="textLight"
                margin={20}
              />
              <Stack>
                <Button title="Torna alla home" onPress={() => navigate('OnBoarding')} />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </FlowerNode>
    </Flower>
  )
})

const styles = StyleSheet.create({
  cardContainer: {
    overflow: 'hidden',
  },
  image: {
    display: 'flex',
    rowGap: 10,
    flex: 1,
    justifyContent: 'space-around',
    paddingBottom: 20,
  },
  bgContent: {
    width: '100%',
  },
})
