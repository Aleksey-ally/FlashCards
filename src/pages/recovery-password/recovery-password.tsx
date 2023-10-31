import { useNavigate } from 'react-router-dom'

import { RecoveryPassword } from '@/components/auth'
import { RecoveryPasswordForm } from '@/components/schemes/use-recovery-password-scheme.ts'
import { useRecoveryPasswordMutation } from '@/services/auth/auth.service.ts'

export const RecoveryPasswordPage = () => {
  const [recoveryPassword] = useRecoveryPasswordMutation()
  const navigate = useNavigate()
  const recoveryHandler = (data: RecoveryPasswordForm) => {
    const { email } = data

    const body = {
      email,
      html: '<h1>Hi, ##name##</h1><p>Click <a href="http://localhost:5173/new-password/##token##">here</a> to recover your password</p>',
    }

    recoveryPassword(body).then(() => navigate(`/check-email/${body.email}`))
  }

  return <RecoveryPassword onSubmit={recoveryHandler} />
}
