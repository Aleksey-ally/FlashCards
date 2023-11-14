import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { SignUp } from '@/components/auth/sign-up'
import { SingUpForm } from '@/components/schemes/use-sign-up-scheme.ts'
import { errorOptions, successOptions } from '@/pages/utils/toastify-options/toastify-options.ts'
import { useSignUpMutation } from '@/services/auth/auth.service.ts'

export const SignUpPage = () => {
  const [signUp] = useSignUpMutation()
  const navigate = useNavigate()

  const handleSignUp = (data: SingUpForm) => {
    const { confirmPassword, ...formData } = data

    signUp(formData)
      .unwrap()
      .then(() => {
        toast.success('You have successfully registered', successOptions)
        navigate('/login')
      })
      .catch(() => {
        toast.error('Email already exists', errorOptions)
      })
  }

  return (
    <div>
      <SignUp onSubmit={handleSignUp} />
    </div>
  )
}
