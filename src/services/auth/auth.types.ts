export type LoginArgs = {
  email: string
  password: string
  rememberMe?: boolean
}
export type LoginResponseType = {
  accessToken: string
}
export type SignUpParamsType = {
  html?: string
  name?: string
  password: string
  email: string
  subject?: string
  sendConfirmationEmail?: boolean
}
export type SignUpDataType = Pick<SignUpParamsType, 'email' | 'password'>
export type SignUpResponseType = Pick<User, 'id' | 'email' | 'name'>

type User = {
  avatar: string | null
  id: string
  email: string
  isEmailVerified: boolean
  name: string
  created: string
  updated: string
}
export type SignUpArgs = {
  email: string
  password: string
}
