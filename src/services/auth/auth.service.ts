import {
  LoginArgs,
  LoginResponseType,
  SignUpArgs,
  SignUpResponseType,
} from '@/services/auth/auth.types.ts'
import { baseApi } from '@/services/base-api.ts'

export const authService = baseApi.injectEndpoints({
  endpoints: builder => ({
    me: builder.query<any, void>({
      query: () => '/v1/auth/me',
      providesTags: ['Me'],
    }),
    login: builder.mutation<LoginResponseType, LoginArgs>({
      query: body => ({
        url: `v1/auth/login`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Me'],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'v1/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Me'],
      //   onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
      //     try {
      //       await queryFulfilled
      //       dispatch(
      //         authService.util.updateQueryData('me', undefined, () => {
      //           return null
      //         })
      //       )
      //     } catch (e) {
      //       // console.log(e)
      //     }
      //   },
    }),
    signUp: builder.mutation<SignUpResponseType, SignUpArgs>({
      query: body => ({
        url: 'v1/auth/sign-up',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useLoginMutation, useMeQuery, useLogoutMutation, useSignUpMutation } = authService
