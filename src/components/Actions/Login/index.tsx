import { useEffect } from 'react'
import { LoadingView } from '@/components/LoadingView'
import { useLogin } from '@/hooks/useLogin'

type LoginProps = { credentialsId: string }

export const Login = ({ credentialsId }: LoginProps) => {
  const loginUser = useLogin({ credentialsId })

  useEffect(() => {
    loginUser()
  }, [loginUser])

  return <LoadingView />
}
