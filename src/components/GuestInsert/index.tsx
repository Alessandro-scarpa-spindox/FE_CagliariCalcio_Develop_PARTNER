import { StyleSheet, useWindowDimensions, View } from 'react-native'
import { memo } from 'react'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { IconButton } from '../IconButton'
import { Input } from '../Form/Input'
import { Dropdown } from '../Dropdown'
import { DateInput } from '../DateInput'
import { Colors } from '@/constants/Colors'
import { Guest } from '@/model/Events'
import { EMAIL_GUEST_REGEX } from '@/constants/regex'

type GuestInsertProps = {
  index: number
  onChange: (guests: Guest[]) => void
  guests: Guest[]
  spaces: { label: string; value: string }[]
}

const _GuestInsert = ({ index, guests, onChange, spaces }: GuestInsertProps) => {
  const { width } = useWindowDimensions()
  const isMobile = width < 700
  return (
    <View style={styles(isMobile).wrapper}>
      <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
        <Text variant="h6" text="Dati ospite" />
        <IconButton
          icon="trash-2"
          fill={Colors.backgroundSecondary}
          onPress={() => onChange(guests.filter((_: Guest, i: number) => i !== index))}
        />
      </Stack>
      <Stack>
        <Input
          label="Nome"
          required
          id={`tempGuests.${index}.firstName`}
          placeholder="Inserisci nome"
          validate={[
            {
              rules: {
                $and: [
                  { [`tempGuests.${index}.firstName`]: { $exists: true } },
                  {
                    [`tempGuests.${index}.firstName`]: { $regex: '^[A-Za-z\\s]{1,50}$' },
                  },
                ],
              },
              message: 'Inserisci un nome valido',
            },
          ]}
        />
      </Stack>

      <Input
        label="Cognome"
        placeholder="Inserisci cognome"
        required
        id={`tempGuests.${index}.lastName`}
        validate={[
          {
            rules: {
              $and: [
                { [`tempGuests.${index}.lastName`]: { $exists: true } },
                { [`tempGuests.${index}.lastName`]: { $regex: '^[A-Za-z\\s]{1,50}$' } },
              ],
            },
            message: 'Inserisci il cognome',
          },
        ]}
      />
      {/*  <DatePicker
        label="Data di nascita"
        id={`tempGuests.${index}.birthDate`}
        placeholder="Inserisci la data di nascita"
        validate={[
          {
            rules: {
              $and: [{ [`tempGuests.${index}.birthDate`]: { $exists: true } }],
            },
            message: 'Inserisci la data di nascita',
          },
        ]}
      /> */}
      <DateInput id={`tempGuests.${index}.birthDate`} label="Data di nascita" />
      <Input
        id={`tempGuests.${index}.email`}
        label="Email (opzionale)"
        placeholder="Inserisci l'email dell'ospite"
        validate={[
          {
            rules: {
              $and: [
                {
                  $self: {
                    $regex: EMAIL_GUEST_REGEX,
                  },
                },
              ],
            },
            message: "L'email inserita non è valida",
          },
        ]}
      />
      <Dropdown
        id={`tempGuests.${index}.spaceId`}
        placeholder="Seleziona lounge"
        label="Seleziona lounge"
        required
        options={spaces}
        validate={[
          {
            rules: { $and: [{ $self: { $exists: true } }] },
            message: 'Inserisci una Lounge',
          },
        ]}
      />
    </View>
  )
}

export const GuestInsert = memo(_GuestInsert)

const styles = (isMobile: boolean) =>
  StyleSheet.create({
    wrapper: {
      rowGap: 8,
      backgroundColor: Colors.backgroundPrimary,
      padding: 20,
      borderRadius: 10,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      width: isMobile ? '100%' : '50%',
      alignSelf: isMobile ? undefined : 'center',
    },
  })
