import { useNavigate, useParams } from 'react-router-dom'

import { NewPassword } from '@/components/auth'
import { NewPasswordForm } from '@/components/schemes/use-new-password-scheme'
import { useResetPasswordMutation } from '@/services/auth/auth.service'

export const NewPasswordPage = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const [resetPassword] = useResetPasswordMutation()

  const resetPasswordHandler = (data: NewPasswordForm) => {
    const { password } = data

    resetPassword({
      token: token as string,
      body: {
        password,
      },
    }).then(() => navigate('/'))
  }

  return <NewPassword onSubmit={resetPasswordHandler} />
}
