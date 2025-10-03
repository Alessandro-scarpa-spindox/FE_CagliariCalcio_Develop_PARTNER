import { FlowerComponent, FlowerValue } from '@flowerforce/flower-react'
import { useCallback } from 'react'
import { get } from '../../../../utils/get'
import { Stack } from '@/components/Stack'
import { User } from '@/model/Users'
import { Text } from '@/components/Text'
import { Button } from '@/components/Button'
import { useWindowDimensions } from 'react-native'

export const AccountInfo = () => {
  const renderContent = useCallback((user: User) => {
    const { width } = useWindowDimensions()
    const isMobile = width < 700
    return (
      <Stack
        justifyContent="center"
        rowGap={16}
        padding={isMobile ? 30 : 70}
        width={isMobile ? '100%' : '80%'}
      >
        {userData.map(({ key, label }) => (
          <Stack
            flexDirection="row"
            key={key}
            justifyContent="flex-start"
            alignItems="center"
            gap={20}
            paddingLeft={isMobile ? null : '25%'}
          >
            <Text text={label} />
            <Text text={get(user, key)} color="textLight" />
          </Stack>
        ))}
        <Stack marginTop={20} alignSelf="center" width={isMobile ? '100%' : '50%'}>
          <Button title="Modifica password" action="next" />
        </Stack>
      </Stack>
    )
  }, [])
  return (
    <FlowerComponent name="AccountInfo">
      <FlowerValue id="user">{({ value }) => renderContent(value)}</FlowerValue>
    </FlowerComponent>
  )
}

type UserData = {
  key: string
  label: string
}[]
const userData: UserData = [
  {
    key: 'partnerData.email',
    label: 'Email: ',
  },
  {
    key: 'partnerData.name',
    label: 'Nome: ',
  },
  {
    key: 'partnerData.phone',
    label: 'Telefono: ',
  },
  {
    key: 'partnerData.maxGuests',
    label: 'Numero ospiti: ',
  },
]
