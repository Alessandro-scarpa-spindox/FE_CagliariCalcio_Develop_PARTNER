import { Card } from '@ui-kitten/components'
import { Modal } from '../Modal'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Button } from '../Button'
import { Colors } from '@/constants/Colors'
import { useModalManager } from '@/hooks/useModalManager'
import { LOGIN_ERROR_KEY } from '@/constants/modals'

export const LoginErrorModal = () => {
  const { closeModal } = useModalManager(LOGIN_ERROR_KEY)

  return (
    <Modal modalKey={LOGIN_ERROR_KEY}>
      <Card
        disabled={true}
        style={{
          backgroundColor: Colors.backgroundPrimaryLight,
          borderRadius: 10,
        }}
      >
        <Stack rowGap={20} paddingHorizontal={10}>
          <Text variant="h6" text="Accesso non consentito" />
          <Text text="I dati inseriti non sono corretti. Per favore inserire le credenziali corrette" />
          <Stack flexDirection="row" columnGap={16} justifyContent="flex-end">
            <Button title="Chiudi" onPress={closeModal} />
          </Stack>
        </Stack>
      </Card>
    </Modal>
  )
}
