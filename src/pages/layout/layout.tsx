import { Outlet } from 'react-router-dom'

import s from './layout.module.scss'

import { Header } from '@/components/ui/header'
import { useLogoutMutation, useMeQuery } from '@/services/auth/auth.service.ts'

export const Layout = () => {
  const { currentData: user } = useMeQuery()
  const [logout] = useLogoutMutation()

  return (
    <>
      <Header user={user} variant={user ? 'with avatar' : 'with button'} onSignOut={logout} />
      <main className={s.main}>
        <Outlet />
      </main>
    </>
  )
}
