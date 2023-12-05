import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { NewPassword } from '@/components/auth'
import { NewPasswordForm } from '@/components/schemes/use-new-password-scheme'
import { Loader } from '@/components/ui/loader'
import { errorOptions, successOptions } from '@/pages/utils/toastify-options/toastify-options.ts'
import { useMeQuery, useResetPasswordMutation } from '@/services/auth/auth.service'

export const NewPasswordPage = () => {
  const { isLoading } = useMeQuery()

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

  if (isLoading) return <Loader />

  return <NewPassword onSubmit={resetPasswordHandler} />
}
