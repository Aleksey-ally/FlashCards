import {
  LoginArgs,
  LoginResponseType,
  RecoveryPasswordArgs,
  ResetPasswordArgs,
  SignUpArgs,
  SignUpResponseType,
  User,
} from '@/services/auth/auth.types.ts'
import { baseApi } from '@/services/base-api.ts'

export const authService = baseApi.injectEndpoints({
  endpoints: builder => ({
    me: builder.query<User, void>({
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
      query: () => {
        return {
          url: 'v1/auth/logout',
          method: 'POST',
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          authService.util.updateQueryData('me', undefined, () => {
            return null
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: ['Me'],
    }),
    updateProfile: builder.mutation<any, any>({
      query: params => {
        return {
          url: `v1/auth/me`,
          method: 'PATCH',
          body: params,
        }
      },
      invalidatesTags: ['Me'],
    }),
    signUp: builder.mutation<SignUpResponseType, SignUpArgs>({
      query: body => ({
        url: 'v1/auth/sign-up',
        method: 'POST',
        body,
      }),
    }),
    recoveryPassword: builder.mutation<void, RecoveryPasswordArgs>({
      query: body => ({
        url: 'v1/auth/recover-password',
        method: 'POST',
        body,
      }),
    }),
    resetPassword: builder.mutation<void, ResetPasswordArgs>({
      query: ({ token, body }) => ({
        url: `v1/auth/reset-password/${token}`,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useMeQuery,
  useLogoutMutation,
  useSignUpMutation,
  useRecoveryPasswordMutation,
  useResetPasswordMutation,
  useUpdateProfileMutation,
} = authService
