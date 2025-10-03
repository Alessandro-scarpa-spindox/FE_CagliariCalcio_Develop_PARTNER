import {
  Flower,
  FlowerNode,
  FlowerAction,
  FlowerRoute,
  FlowerFlow,
  useFlower,
  useFlowerForm,
} from '@flowerforce/flower-react'
import { RouteProp, useRoute } from '@react-navigation/native'
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native'
import { useCallback } from 'react'
import Toast from 'react-native-toast-message'
import { Registration } from '../Registration'
import { Input } from '@/components/Form/Input'
import { Stack } from '@/components/Stack'
import { Button } from '@/components/Button'
import { Login } from '@/components/Actions/Login'
import { Logo } from '@/components/Logo'
import { Text } from '@/components/Text'
import { GetRegisterInformationList } from '@/components/Actions/GetRegisterInformation'
import { EMAIL_REGEX } from '@/constants/regex'
import { useModalManager } from '@/hooks/useModalManager'
import { LoginErrorModal } from '@/components/LoginErrorModal'
import { LOGIN_ERROR_KEY } from '@/constants/modals'

import KeyboardContainer from '@/components/KeyboardContainer'
import { resetNewPassword } from '@/api/resetNewPassword'

//TODO -> questo andrebbe spostato per definire i params in tutte le route
type RootStackParamList = {
  OnBoarding: { token?: string }
}
type OnboardingProps = RouteProp<RootStackParamList, 'OnBoarding'>

export const Onboarding = () => {
  const { params }: OnboardingProps = useRoute()
  const { isOpen } = useModalManager(LOGIN_ERROR_KEY)
  const { next } = useFlower({ flowName: 'onboarding' })

  const { getData } = useFlowerForm({ flowName: 'onboarding' })
  const { width } = useWindowDimensions()
  const isTablet = width < 1200

  const resetPassword = useCallback(async () => {
    const userEmail = getData('user.email')
    try {
      await resetNewPassword(userEmail)
      next('onReset')
    } catch (e) {
      console.log('error in reset password - ', e)
      Toast.show({
        type: 'error',
        text1: 'Errore!',
        text2: 'Utente non esistente',
      })
    }
  }, [getData, next])

  return (
    <Flower name="onboarding" initialData={params}>
      <FlowerRoute
        id="Start"
        to={{
          login: { rules: { $and: [{ token: { $exists: false } }] } },
          passwordRecovery: {
            rules: {
              $and: [{ token: { $exists: true } }, { tokenId: { $exists: true } }],
            },
          },
        }}
      />

      {/**
       * LOGIN FORM
       * Form di login per i partner
       */}
      <FlowerNode
        id="login"
        to={{ loginPartner: 'onLogin', resetPasswordForm: 'onReset' }}
      >
        <KeyboardContainer>
          <ImageBackground
            source={require('../../../assets/images/loginBg.png')}
            style={styles.image}
            imageStyle={styles.bgContent}
          >
            <Stack
              alignItems="center"
              justifyContent="center"
              transform="translateY(30px)"
            >
              <Logo size={130} hasOpacity />
            </Stack>
            <Stack
              width={isTablet ? 'auto' : 1200}
              marginHorizontal={isTablet ? 0 : 'auto'}
              paddingHorizontal={40}
              gap={30}
            >
              <Text variant="h4" text="Benvenuto" textAlign="center" />
              <Stack gap={20}>
                <Input
                  id="user.email"
                  label="Email"
                  placeholder="Inserisci la tua email"
                  validate={[
                    {
                      rules: {
                        $and: [
                          { $self: { $exists: true } },
                          {
                            $self: {
                              $regex: EMAIL_REGEX,
                            },
                          },
                        ],
                      },
                      message: 'Inserisci la tua email',
                    },
                  ]}
                />
                <Input
                  id="user.password"
                  label="Password"
                  placeholder="Inserisci la tua password"
                  secureText
                  validate={[
                    {
                      rules: { $and: [{ $self: { $exists: true } }] },
                      message: 'Inserisci la tua password',
                    },
                  ]}
                />
              </Stack>
              <Stack gap={20}>
                <Button
                  title="Login"
                  action="next"
                  onPress={() => next('onLogin')}
                  rules={{ $and: [{ '$form.isValid': { $eq: true } }] }}
                  alwaysDisplay
                />
                <Stack justifyContent="center" alignItems="center">
                  <Button
                    title="Reset password"
                    variant="text"
                    onPress={() => next('onReset')}
                    alwaysDisplay
                  />
                </Stack>
              </Stack>
            </Stack>
            <Stack
              alignItems="center"
              justifyContent="center"
              transform="translateY(20px)"
            >
              <Text variant="h6" text="Cagliari Calcio Partners" />
            </Stack>
          </ImageBackground>
        </KeyboardContainer>
        {isOpen && <LoginErrorModal />}
      </FlowerNode>

      {/**
       * LOGIN
       * Chiamata per il login utente
       */}
      <FlowerAction id="loginPartner">
        <Login credentialsId="user" />
      </FlowerAction>

      <FlowerAction id="getTokenRegistration" to={{ Registration: null }}>
        <GetRegisterInformationList />
      </FlowerAction>

      <FlowerFlow id="Registration" to={{ RegistrationConfirm: null }}>
        <Registration />
      </FlowerFlow>

      <FlowerNode id="RegistrationConfirm">
        <Stack>
          <Text variant="h1" text="Registrazione confermata" />
        </Stack>
      </FlowerNode>

      <FlowerNode id="resetPasswordForm" to={{ resetPasswordEmailResponse: 'onReset' }}>
        <ImageBackground
          source={require('../../../assets/images/loginBg.png')}
          style={styles.image}
          imageStyle={styles.bgContent}
        >
          <Stack alignItems="center" justifyContent="center" transform="translateY(30px)">
            <Logo size={130} hasOpacity />
          </Stack>
          <Stack paddingHorizontal={40} gap={50}>
            <Text text="Inserisci la tua mail" variant="h6" textAlign="center" />
            <Input
              id="user.email"
              label="Email"
              placeholder="Inserisci la tua email"
              validate={[
                {
                  rules: {
                    $and: [
                      { $self: { $exists: true } },
                      {
                        $self: {
                          $regex: EMAIL_REGEX,
                        },
                      },
                    ],
                  },
                  message: 'Inserisci la tua email',
                },
              ]}
            />
            <Stack gap={20}>
              <Button
                title="Invia reset password"
                onPress={resetPassword}
                alwaysDisplay
              />
              <Stack justifyContent="center" alignItems="center">
                <Button variant="text" title="Back" action="back" alwaysDisplay />
              </Stack>
            </Stack>
          </Stack>
          <Stack alignItems="center" justifyContent="center" transform="translateY(20px)">
            <Text variant="h6" text="Cagliari Calcio Partners" />
          </Stack>
        </ImageBackground>
      </FlowerNode>

      <FlowerNode id="resetPasswordEmailResponse" to={{ login: 'onLogin' }}>
        <ScrollView
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          bounces={false}
          style={{ height: '100%', overflow: 'hidden' }}
        >
          {/*  <ImageBackground
                source={require('../../../assets/images/loginBg.png')}
                style={styles.image}
              > */}
          <Stack alignItems="center" justifyContent="center" transform="translateY(30px)">
            <Logo size={130} hasOpacity />
          </Stack>

          {
            <Stack paddingHorizontal={40} gap={40} marginTop={40}>
              <Text
                text="È stata inviata una email all'utente connesso per effettuare il reset della password !"
                variant="h6"
                textAlign="center"
              />
              <Stack justifyContent="center" alignItems="center">
                <Button
                  title="Torna alla pagina login"
                  onPress={() => next('onLogin')}
                  alwaysDisplay
                />
              </Stack>
            </Stack>
          }
          <Stack alignItems="center" justifyContent="center" transform="translateY(20px)">
            <Text variant="h6" text="Cagliari Calcio Partners" />
          </Stack>
          {/*   </ImageBackground> */}
        </ScrollView>
      </FlowerNode>
    </Flower>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    overflow: 'hidden',
  },
  image: {
    height: ' 100%',
    overflow: 'hidden',
    display: 'flex',
    rowGap: 20,
    flex: 1,
    justifyContent: 'space-around',
    paddingBottom: 40,
  },
  bgContent: {
    width: '100%',
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    /*  transition: 'padding-bottom 0.3s', */
  },
  keyboardOpen: {
    paddingBottom: 200, // Adatta questo valore secondo necessità
  },
})
