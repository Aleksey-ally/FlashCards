import { Outlet } from 'react-router-dom'

import { Header } from '@/components/ui/header'
import { useMeQuery } from '@/services/auth/auth.service.ts'

export const Layout = () => {
  const { data: user } = useMeQuery()

  return (
    <>
      <Header user={user} variant={'with avatar'} />
      <main>
        <Outlet />
      </main>
    </>
  )
}
