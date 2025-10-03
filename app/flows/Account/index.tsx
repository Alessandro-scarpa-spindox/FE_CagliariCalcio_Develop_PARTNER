import { Flower, FlowerNode, FlowerAction } from '@flowerforce/flower-react'
import { AccountInfo } from './Components/AccountInfo'
import { withBackgroundImage } from '@/hocs/withLayout'
import { Stack } from '@/components/Stack'
import { Text } from '@/components/Text'
import { GetCurrentUser } from '@/components/Actions/GetCurrentUser'
import { SendResetPassword } from '@/components/Actions/SendResetPassword'
import { Button } from '@/components/Button'

export const Account = withBackgroundImage(() => {
  return (
    <Flower name="account">
      {/**
       * GET CURRENT USER
       * Retrive user Info
       */}
      <FlowerAction id="getCurrentUser" to={{ accountInfo: null }}>
        <GetCurrentUser />
      </FlowerAction>

      {/**
       * ACCOUNT INFO
       * Informazioni account utente
       */}
      <FlowerNode id="accountInfo" to={{ sendResetEmail: null }}>
        <Stack alignItems="center">
          <Text text="Informazioni Account" variant="h5" />
          <AccountInfo />
        </Stack>
      </FlowerNode>

      {/**
       * SEND RESET CONFIRM
       * Invio una mail all'utente connesso
       */}
      <FlowerAction id="sendResetEmail" to={{ resetConfirm: null }}>
        <SendResetPassword />
      </FlowerAction>

      {/**
       * RESET CONFIRM
       * Conferma del reset della password
       */}
      <FlowerNode id="resetConfirm">
        <Stack
          alignItems="center"
          justifyContent="center"
          paddingHorizontal={20}
          height={'100%'}
          gap={30}
        >
          <Stack>
            <Text
              text="È stata inviata una email all'utente connesso per effettuare il reset della password !"
              variant="h6"
              textAlign="center"
            />
          </Stack>

          <Stack gap={20}>
            <Stack justifyContent="center" alignItems="center">
              <Button variant="text" title="Indietro" action="back" alwaysDisplay />
            </Stack>
          </Stack>
        </Stack>
      </FlowerNode>
    </Flower>
  )
})
