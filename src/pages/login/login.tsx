import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { SignIn } from '@/components/auth'
import { Loader } from '@/components/ui/loader'
import { errorOptions, infoOptions } from '@/pages/utils/toastify-options/toastify-options.ts'
import { useLoginMutation, useMeQuery } from '@/services/auth/auth.service.ts'
import { LoginArgs, LoginResponseError } from '@/services/auth/auth.types.ts'

export const Login = () => {
  const { isLoading, isError } = useMeQuery()
  const [login] = useLoginMutation()
  const isAuth = !isError
  const loginHandler = (loginData: LoginArgs) => {
    login(loginData)
      .unwrap()
      .then(() => {
        toast.info('You are welcome!', infoOptions)
      })
      .catch((err: LoginResponseError) => {
        toast.error(err.data.message, errorOptions)
      })
  }

  if (isLoading) return <Loader />

  if (isAuth) return <Navigate to={'/'} replace={true} />

  return <SignIn onSubmit={loginHandler} />
}
