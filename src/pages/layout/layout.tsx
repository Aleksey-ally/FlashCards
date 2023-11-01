import { Outlet } from 'react-router-dom'

import s from './layout.module.scss'

import { Header } from '@/components/ui/header'
import { useLogoutMutation, useMeQuery } from '@/services/auth/auth.service.ts'

export const Layout = () => {
  const { data: user } = useMeQuery()
  const [logout] = useLogoutMutation()

  return (
    <>
      <Header user={user} variant={'with avatar'} onSignOut={logout} />
      <main className={s.main}>
        <Outlet />
      </main>
    </>
  )
}
