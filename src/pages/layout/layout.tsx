import { Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'

import s from './layout.module.scss'

import { Header } from '@/components/ui/header'
import { infoOptions } from '@/pages/utils/toastify-options/toastify-options.ts'
import { useLogoutMutation, useMeQuery } from '@/services/auth/auth.service.ts'

export const Layout = () => {
  const { currentData: user } = useMeQuery()
  const [logout] = useLogoutMutation()
  const parting = `Goodbye, ${user?.name || user?.email}`

  const logoutHandler = () => {
    logout()
      .unwrap()
      .then(() => {
        toast.info(parting, infoOptions)
      })
  }

  return (
    <>
      <Header
        user={user}
        variant={user ? 'with avatar' : 'with button'}
        onSignOut={logoutHandler}
      />
      <main className={s.main}>
        <Outlet />
      </main>
    </>
  )
}
