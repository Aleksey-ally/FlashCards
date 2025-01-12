import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'
import { matchPath } from 'react-router-dom'

import { privateRoutes, router } from '@/router.tsx'

const baseUrl = `https://api.flashcards.andrii.es`

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: headers => {
    const token = localStorage.getItem('accessTokenCards')

    if (headers.get('Authorization')) {
      return headers
    }

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  },
})

export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      const refreshToken = localStorage.getItem('refreshTokenCards')

      try {
        const refreshResult = (await baseQuery(
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
            url: 'v2/auth/refresh-token',
            method: 'POST',
          },
          api,
          extraOptions
        )) as any

        if (refreshResult.data) {
          localStorage.setItem('accessTokenCards', refreshResult.data.accessToken)
          localStorage.setItem('refreshTokenCards', refreshResult.data.refreshToken)

          result = await baseQuery(args, api, extraOptions)
        } else {
          const location = window.location.pathname

          const privateRoutesPaths = privateRoutes.map(route => route.path)

          const shouldRedirect = privateRoutesPaths.some(routePath => {
            if (routePath) {
              return matchPath(routePath, location)
            }

            return false
          })

          if (shouldRedirect) {
            await router.navigate('/login')
          }
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}
