import { useFlower, useFlowerForm } from '@flowerforce/flower-react'
import { useCallback, useEffect } from 'react'
import { LoadingView } from '@/components/LoadingView'
import { checkEmailRegisteded } from '@/api/checkEmailRegisteded'
import { Users } from '@/schema/Users'

export const CheckEmailForResetPassword = () => {
  const { jump } = useFlower({ flowName: 'onboarding' })
  const { getData, unsetData } = useFlowerForm()
  const goto = useCallback(
    (users: Users | null) =>
      users ? jump('sendResetPassword') : jump('resetPasswordFailed'),
    [jump],
  )
  const checkEmail = useCallback(async () => {
    const email: string = getData('user.email')
    const isEmailValid = await checkEmailRegisteded(email)
    goto(isEmailValid)
    unsetData('user.email')

    try {
    } catch (e) {
      console.log(e) // TODO -> aggiungere gestione con back e snack di errore
    }
  }, [getData, goto, unsetData])

  useEffect(() => {
    checkEmail()
  }, [checkEmail])
  return <LoadingView />
}
