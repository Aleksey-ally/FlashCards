import { useNavigate, useParams } from 'react-router-dom'

import { CheckEmail } from '@/components/auth'
import { Loader } from '@/components/ui/loader'
import { useMeQuery } from '@/services/auth/auth.service.ts'

export const CheckEmailPage = () => {
  const { isLoading } = useMeQuery()

  const { email } = useParams()
  const navigate = useNavigate()

  const onClickBackToSignIn = () => {
    navigate('/login')
  }

  if (isLoading) return <Loader />

  return <CheckEmail onClick={onClickBackToSignIn} email={email} />
}
