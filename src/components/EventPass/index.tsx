import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native'
import { FlowerValue, useFlowerForm } from '@flowerforce/flower-react'
import dayjs from 'dayjs'
import { useNavigation } from 'expo-router'
import { useCallback } from 'react'
import * as Clipboard from 'expo-clipboard'
import Toast from 'react-native-toast-message'
import { QrCode } from '../QrCode'
import { Text } from '../Text'
import { Stack } from '../Stack'
import { WalletButton } from '../WalletButton'
import { Logo } from '../Logo'
import { IconButton } from '../IconButton'
import { Color, Colors } from '@/constants/Colors'

const darkTextColors = ['#FFD700', '#ffffff', '#C0C0C0']

export const EventPass = ({ guestId }: { guestId?: string }) => {
  const { getData } = useFlowerForm()
  const { width } = useWindowDimensions()
  const isMobile = width < 700

  const ticketGuest = getData('ticketInfo.guest')

  const { goBack } = useNavigation()

  const copyToClipboard = useCallback(async () => {
    const name = `${ticketGuest?.firstName.replaceAll(' ', '')}${ticketGuest?.lastName.replaceAll(' ', '')}`
    const LINK_PARTNER = process.env.EXPO_PUBLIC_REACT_APP_LINK_PARTNER
    const url = `${LINK_PARTNER}/ticket/${ticketGuest?.id}/${name}`

    await Clipboard.setStringAsync(url)

    Toast.show({
      type: 'success',
      text1: 'Link copiato!',
      text2: 'Hai copiato il link del ticket',
    })
  }, [ticketGuest])

  return (
    <FlowerValue id="ticketInfo">
      {({ value }) => {
        const headerColor = darkTextColors.includes(value?.guest?.color)
          ? 'backgroundPrimary'
          : 'textLight'

        const birthDate = value?.guest?.birthDate

        const formattedDate = birthDate.includes('000Z')
          ? dayjs(value?.guest?.birthDate).format('DD/MM/YYYY') !== 'Invalid Date'
            ? dayjs(value?.guest?.birthDate).format('DD/MM/YYYY')
            : '-'
          : birthDate

        return (
          <ScrollView
            style={{ backgroundColor: value?.guest?.color || Colors.backgroundPrimary }}
            contentContainerStyle={{
              flex: 1,
              height: '100%',
            }}
          >
            {!guestId && (
              <Stack
                flexDirection="row"
                justifyContent="space-between"
                paddingHorizontal={20}
                paddingVertical={10}
                backgroundColor={value?.guest?.color || Colors.backgroundPrimary}
                backfaceVisibility="hidden"
                zIndex={5}
              >
                <IconButton
                  action="back"
                  icon="arrow-back"
                  text={isMobile ? '' : 'Indietro'}
                  labelColor={headerColor}
                  onPress={goBack}
                  fill={Colors[headerColor]}
                />

                <IconButton
                  text="Copia link ticket"
                  gap={2}
                  icon="copy-outline"
                  onPress={copyToClipboard}
                  fill={Colors[headerColor]}
                  labelColor={headerColor as Color}
                />

                <WalletButton color={Colors[headerColor]} />
              </Stack>
            )}
            <View style={styles(value?.guest?.color || Colors.backgroundPrimary).wrapper}>
              {value?.guest?.status && (
                <Stack
                  backgroundColor={Colors.danger}
                  alignItems="center"
                  justifyContent="center"
                  position="absolute"
                  top={0}
                  width="100%"
                  height={30}
                  zIndex={10}
                >
                  <Text
                    fontSize={22}
                    fontWeight={600}
                    text="Ingresso stadio già effettuato"
                  />
                </Stack>
              )}
              <View
                style={
                  styles(value?.guest?.color || Colors.backgroundPrimary, isMobile).card
                }
              >
                <Stack>
                  <Logo size={50} />
                </Stack>
                <Stack
                  gap={8}
                  alignItems="center"
                  justifyContent="center"
                  marginTop={5}
                  marginBottom={5}
                >
                  <Text
                    text={value.event.name}
                    rules={() => value.event.type === 'event'}
                  />
                  <Text
                    text={`Cagliari - ${value?.event.opponent ? value.event.opponent : 'Da definire'}`}
                    variant="h4"
                    fontSize={20}
                    rules={() => value.event.type !== 'event'}
                  />
                  <Text
                    text={
                      value?.event?.date
                        ? dayjs(value.event.date).format('ddd, DD MMM YYYY - HH:mm')
                        : 'Data da definire'
                    }
                  />
                </Stack>
                <Stack gap={16}>
                  <Stack alignItems="center">
                    <Text text="Ospite:" />
                    <Stack flexDirection="row" gap={8}>
                      <Text text={value?.guest?.firstName} variant="h5" fontSize={18} />
                      <Text text={value?.guest?.lastName} variant="h5" fontSize={18} />
                    </Stack>
                  </Stack>
                  <Stack alignItems="center">
                    <Text text="Data di nascita:" />
                    <Text text={formattedDate} variant="h5" fontSize={16} />
                  </Stack>
                  <Stack alignItems="center">
                    <Text text="Partner:" />
                    <Text text={value?.partner?.name} variant="h6" fontSize={16} />
                  </Stack>
                  <Stack
                    alignItems="center"
                    marginBottom={5}
                    rules={() => value.event.type !== 'event'}
                  >
                    <Text text="Lounge:" />
                    <Text text={value?.guest?.nameLounge} variant="h6" fontSize={16} />
                  </Stack>
                  <Stack
                    alignItems="center"
                    marginBottom={5}
                    rules={() => value.event.type === 'event'}
                  >
                    <Text text="Luogo evento:" />
                    <Text text={value?.event?.place} variant="h6" fontSize={16} />
                  </Stack>
                </Stack>

                <QrCode
                  isScanned={value?.guest?.status}
                  link={`${value?.event?.id}/${value?.guest?.ticket || value?.guest?.qrcode}`}
                />
                <Text
                  text={value?.guest?.ticket || value?.guest?.qrcode}
                  fontSize={25}
                  letterSpacing={2}
                />
              </View>
            </View>
          </ScrollView>
        )
      }}
    </FlowerValue>
  )
}

const styles = (color: string, isMobile?: boolean) =>
  StyleSheet.create({
    wrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      //backgroundColor: color,
    },
    card: {
      height: 'auto',
      width: isMobile ? '80%' : '50%',
      alignSelf: isMobile ? undefined : 'center',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 25,
      borderRadius: 10,
      backgroundColor: Colors.backgroundPrimary,
    },
  })
