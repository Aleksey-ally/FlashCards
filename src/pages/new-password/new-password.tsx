import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { NewPassword } from '@/components/auth'
import { NewPasswordForm } from '@/components/schemes/use-new-password-scheme'
import { errorOptions, successOptions } from '@/pages/utils/toastify-options/toastify-options.ts'
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
    })
      .unwrap()
      .then(() => {
        toast.success('Password reset successfully', successOptions)
        navigate('/')
      })
      .catch(() => toast.error('Incorrect or expired password reset token', errorOptions))
  }

  return <NewPassword onSubmit={resetPasswordHandler} />
}
