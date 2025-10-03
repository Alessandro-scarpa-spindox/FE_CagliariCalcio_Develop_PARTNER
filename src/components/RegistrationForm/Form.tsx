import React from 'react'
import { Input } from '@/components/Form/Input'
import { Stack } from '@/components/Stack'
import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { useModalManager } from '@/hooks/useModalManager'
import { PRIVACY_CONSENT } from '@/constants/modals'
import { CheckBox } from '../Form/Checkbox'
import { useMobile } from '@/hooks/useMobile'
import { useWindowDimensions } from 'react-native'

type Props = {
  email: string
  name: string
  phone: string
}

export const Form = ({ email }: Props) => {
  const { openModal } = useModalManager(PRIVACY_CONSENT)
  const { width } = useWindowDimensions()
  const isMobile = width < 700

  return (
    <Stack display="flex" justifyContent="space-between">
      <Stack
        paddingHorizontal={20}
        rowGap={20}
        paddingTop={40}
        paddingBottom={20}
        width="100%"
      >
        <Stack rowGap={20}>
          <Stack rowGap={20}>
            <Stack flexDirection="row" gap={10}>
              <Text text="Email:" fontWeight={600} />
              <Text text={email || '-'} fontWeight={600} />
            </Stack>
          </Stack>
        </Stack>
        <Stack gap={20}>
          <Text color="warning" text="Crea la tua password" fontSize={16} />
          <Stack gap={20}>
            <Input
              id="partnerData.password"
              label="Password"
              placeholder="Inserisci la tua password"
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
              id="partnerData.passwordConfirm"
              label="Conferma Password"
              placeholder="Conferma la tua password"
              secureText
              validate={[
                {
                  rules: {
                    $and: [
                      { $self: { $exists: true } },
                      { $self: { $eq: '$ref:partnerData.password' } },
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
            <Stack flexDirection="row" alignItems="center" gap={10}>
              <CheckBox label="" id="partnerData.privacy" />
              <Stack
                flexDirection={isMobile ? 'column' : 'row'}
                alignItems={isMobile ? 'flex-start' : 'center'}
                gap={isMobile ? 0 : 5}
              >
                <Text text="Accetto l'informativa sulla privacy disponibile" />
                <Button
                  title="qui"
                  action="next"
                  noRadius
                  style={{
                    padding: 0,
                    borderBottomWidth: 2,
                    borderBlockColor: 'white',
                    minWidth: 0,
                  }}
                  onPress={openModal}
                  variant="tertiary"
                />
              </Stack>
            </Stack>
            <Button
              title="Continua"
              action="next"
              alwaysDisplay
              rules={{
                $and: [
                  { '$form.isValid': { $eq: true } },
                  { 'partnerData.privacy': { $eq: true } },
                ],
              }}
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
