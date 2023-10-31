import { useNavigate, useParams } from 'react-router-dom'

import { CheckEmail } from '@/components/auth'

export const CheckEmailPage = () => {
  const { email } = useParams()
  const navigate = useNavigate()

  const onClickBackToSignIn = () => {
    navigate('/login')
  }

  return <CheckEmail onClick={onClickBackToSignIn} email={email} />
}
