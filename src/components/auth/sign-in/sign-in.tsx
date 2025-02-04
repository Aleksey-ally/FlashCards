import { Link } from 'react-router-dom'

import s from './sign-in.module.scss'

import { SingInForm, useSignInScheme } from '@/components/schemes/use-sign-in-scheme.ts'
import Button from '@/components/ui/button/button.tsx'
import { Card } from '@/components/ui/card'
import { ControlledCheckbox } from '@/components/ui/controlled/controlled-checkbox'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { Typography } from '@/components/ui/typography'

type Props = {
  onSubmit: (data: SingInForm) => void
}

export const SignIn = ({ onSubmit }: Props) => {
  const { handleSubmit, control } = useSignInScheme()

  const onFormSubmit = handleSubmit(onSubmit)

  return (
    <Card className={s.card}>
      <Typography variant="large" className={s.title}>
        Sign In
      </Typography>

      <form className={s.form} onSubmit={onFormSubmit}>
        <ControlledTextField label="Email" control={control} name="email" />
        <ControlledTextField label="Password" control={control} name="password" type="password" />
        <ControlledCheckbox label="Remember me" control={control} name="rememberMe" />

        <Typography as={Link} to="/recovery-password" variant="body2" className={s.recovery}>
          Forgot Password?
        </Typography>
        <Button type="submit" fullWidth className={s.button}>
          Sign In
        </Button>
      </form>
      <Typography variant="body2" className={s.question}>
        {`Don't have an account?`}
      </Typography>
      <Typography variant="link1" as={Link} to="/sign-up" className={s.signUp1}>
        Sign Up
      </Typography>
    </Card>
  )
}
