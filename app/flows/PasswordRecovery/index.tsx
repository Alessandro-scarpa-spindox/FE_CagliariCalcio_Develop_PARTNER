import {
  Flower,
  FlowerAction,
  FlowerNode,
  useFlower,
  useFlowerForm,
} from '@flowerforce/flower-react'
import { SafeAreaView, StyleSheet, useWindowDimensions, View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useCallback } from 'react'
import { useNavigation } from 'expo-router'
import { Input } from '@/components/Form/Input'
import { Stack } from '@/components/Stack'
import { withBackgroundImage } from '@/hocs/withLayout'
import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { ConfirmPassword } from '@/components/Actions/ConfirmPassword'
import { useRealmAuth } from '@/hooks/useRealmAuth'
import { Logo } from '@/components/Logo'

export const PasswordRecovery = withBackgroundImage(() => {
  const { params }: any = useRoute()
  const { next } = useFlower({ flowName: 'PasswordRecovery' })
  const { token, tokenId } = params
  const { width } = useWindowDimensions()
  const isMobile = width < 700
  const { logoutUser, isAuthenticated } = useRealmAuth()

  const { restart } = useFlower()
  const { unsetData } = useFlowerForm()
  const { navigate }: any = useNavigation()

  const backtoLoginpage = useCallback(async () => {
    unsetData('token')
    unsetData('tokenId')
    if (isAuthenticated) {
      logoutUser()
      return navigate('Account')
    }
    restart()
    navigate('OnBoarding')
  }, [navigate, logoutUser, unsetData, restart, isAuthenticated])

  return (
    <Flower name="PasswordRecovery" initialData={{ token, tokenId }}>
      {/**
       * RECOVERY PASSWORD
       * Insert new password
       */}
      <FlowerNode id="recovery" to={{ sendChangepassword: 'onSuccess' }}>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack
            paddingHorizontal={20}
            justifyContent="center"
            rowGap={20}
            height={'100%'}
          >
            <Logo style={{ alignSelf: 'center' }} size={130} hasOpacity />

            <Stack gap={50}>
              <Text
                text="Modifica password"
                textAlign="center"
                variant="h5"
                marginBottom={20}
              />
              <Stack gap={20} alignSelf="center" width={isMobile ? '100%' : '50%'}>
                <Input
                  label="Inserisci la nuova password"
                  placeholder="Inserisci la nuova password"
                  id="newPassword"
                  secureText
                  validate={[
                    {
                      rules: {
                        $and: [
                          { $self: { $exists: true } },
                          {
                            $self: {
                              $regex:
                                /^(?=.*[0-9])(?=.*[._,;!@#$%^?&*])[a-zA-Z0-9!@#,$%^&*._?;]{6,25}$/,
                            },
                          },
                        ],
                      },
                      message:
                        'Inserisci una password di minimo 6 e massimo 25 caratteri che abbia almeno un numero, una lettera maiuscola e un carattere speciale (Es. !@#,$%^&*._?;)',
                    },
                  ]}
                />
                <Input
                  label="Conferma la password"
                  placeholder="Conferma la password"
                  id="newPasswordConfirm"
                  secureText
                  validate={[
                    {
                      rules: {
                        $and: [
                          { $self: { $exists: true } },
                          { $self: { $eq: '$ref:newPassword' } },
                          {
                            $self: {
                              $regex:
                                /^(?=.*[0-9])(?=.*[._,;!@#$%^?&*])[a-zA-Z0-9!@#,$%^&*._?;]{6,25}$/,
                            },
                          },
                        ],
                      },
                      message: 'Le password non coincidono',
                    },
                  ]}
                />
              </Stack>
              <Stack gap={20} alignSelf="center" width={isMobile ? '100%' : '50%'}>
                <Button
                  title="Cambia password"
                  rules={{ '$form.isValid': { $eq: true } }}
                  alwaysDisplay
                  onPress={() => next('onSuccess')}
                />
              </Stack>
            </Stack>
          </Stack>
        </SafeAreaView>
      </FlowerNode>

      <FlowerAction id="sendChangepassword" to={{ confirmChangepassword: 'onSuccess' }}>
        <ConfirmPassword />
      </FlowerAction>

      <FlowerNode id="confirmChangepassword">
        <Stack alignItems="center" minHeight={'100%'} justifyContent="center" gap={15}>
          <View style={styles.textWrapper}>
            <Text variant="h5" text="Password modificata" />
            <Text fontSize={16} text="La password è stata modificata con successo " />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              title={'Torna alla pagina di Login'}
              variant="primary"
              onPress={backtoLoginpage}
            />
          </View>
        </Stack>
      </FlowerNode>
    </Flower>
  )
})

const styles = StyleSheet.create({
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 4,
    margin: 8,
  },
  textWrapper: {
    display: 'flex',
    justifyContent: 'center',
    margin: 8,
    alignItems: 'center',
    gap: 15,
  },
})
