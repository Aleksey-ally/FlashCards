import { LoginArgs, LoginResponseType } from '@/services/auth/auth.types.ts'
import { baseApi } from '@/services/base-api.ts'

export const authService = baseApi.injectEndpoints({
  endpoints: builder => ({
    me: builder.query<any, void>({
      query: () => '/v1/auth/me',
      providesTags: ['Me'],
    }),
    login: builder.mutation<LoginResponseType, LoginArgs>({
      query: params => ({
        url: 'v1/auth/login',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['Me'],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'v1/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Me'],
    }),
  }),
})

export const { useLoginMutation, useMeQuery, useLogoutMutation } = authService
