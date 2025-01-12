import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { Loader } from '@/components/ui/loader'
import { CardPage } from '@/pages/card/card.tsx'
import { Cards } from '@/pages/cards'
import { CheckEmailPage } from '@/pages/check-email'
import { Decks } from '@/pages/decks/decks.tsx'
import { Layout } from '@/pages/layout'
import { Login } from '@/pages/login/login.tsx'
import { NewPasswordPage } from '@/pages/new-password'
import { Profile } from '@/pages/profile'
import { RecoveryPasswordPage } from '@/pages/recovery-password'
import { SignUpPage } from '@/pages/sign-up'
import { useMeQuery } from '@/services/auth/auth.service.ts'

export const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
  },
  {
    path: '/recovery-password',
    element: <RecoveryPasswordPage />,
  },
  {
    path: '/new-password/:token',
    element: <NewPasswordPage />,
  },
  {
    path: '/check-email/:email',
    element: <CheckEmailPage />,
  },
]

export const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Decks />,
  },
  {
    path: '/cards/:deckID',
    element: <Cards />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/card/:deckID',
    element: <CardPage />,
  },
]

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <PrivateRoutes />,
        children: privateRoutes,
      },
      ...publicRoutes,
      {
        path: '*',
        element: <h1>Not Found</h1>,
      },
    ],
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const { isError, isLoading } = useMeQuery()
  const isAuthenticated = !isError

  if (isLoading) return <Loader />

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
