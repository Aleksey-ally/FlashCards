import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { RecoveryPassword } from '@/components/auth'
import { RecoveryPasswordForm } from '@/components/schemes/use-recovery-password-scheme.ts'
import { errorOptions } from '@/pages/utils/toastify-options/toastify-options.ts'
import { useRecoveryPasswordMutation } from '@/services/auth/auth.service.ts'

export const RecoveryPasswordPage = () => {
  const [recoveryPassword] = useRecoveryPasswordMutation()
  const navigate = useNavigate()
  const recoveryHandler = (data: RecoveryPasswordForm) => {
    const { email } = data

    const body = {
      email,
      html: `<h1>Hi, ##name##</h1><p>Click <a href="${window.location.origin}/new-password/##token##">here</a> to recover your password</p>`,
    }

    recoveryPassword(body)
      .unwrap()
      .then(() => navigate(`/check-email/${body.email}`))
      .catch(() => toast.error('User not found', errorOptions))
  }

  return <RecoveryPassword onSubmit={recoveryHandler} />
}
