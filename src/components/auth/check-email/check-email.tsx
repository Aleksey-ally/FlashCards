import { Card } from '../../ui/card'
import { Typography } from '../../ui/typography'

import s from './check-email.module.scss'

import { Email } from '@/assets'
import Button from '@/components/ui/button/button.tsx'

type Props = {
  onClick?: () => void
  email?: string
}

export const CheckEmail = ({ onClick, email }: Props) => {
  return (
    <Card className={s.card}>
      <Typography variant="large" className={s.title}>
        Check Email
      </Typography>
      <Email className={s.emailIcon} />
      <Typography variant="body2" className={s.description}>
        We’ve sent an Email with instructions to {email}
      </Typography>
      <Button onClick={onClick} type="submit" fullWidth className={s.button}>
        Back to Sign In
      </Button>
    </Card>
  )
}
