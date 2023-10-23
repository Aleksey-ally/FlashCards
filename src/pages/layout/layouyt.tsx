import { Outlet } from 'react-router-dom'

import { Header } from '@/components/ui/header'
import { useLogoutMutation, useMeQuery } from '@/services/auth/auth.service.ts'

export const Layout = () => {
  const { data: user } = useMeQuery()
  const [logout] = useLogoutMutation()

  return (
    <>
      <Header user={user} variant={'with avatar'} onSignOut={logout} />
      <main>
        <Outlet />
      </main>
    </>
  )
}
