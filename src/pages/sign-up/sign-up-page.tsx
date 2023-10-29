import { useNavigate } from 'react-router-dom'

import { SignUp } from '@/components/auth/sign-up'
import { SingUpForm } from '@/components/schemes/use-sign-up-scheme.ts'
import { useSignUpMutation } from '@/services/auth/auth.service.ts'

export const SignUpPage = () => {
  const [signUp] = useSignUpMutation()
  const navigate = useNavigate()

  const handleSignUp = (data: SingUpForm) => {
    const { confirmPassword, ...formData } = data

    signUp(formData)
      .unwrap()
      .then(() => {
        navigate('/login')
      })
  }

  return (
    <div>
      <SignUp onSubmit={handleSignUp} />
    </div>
  )
}
