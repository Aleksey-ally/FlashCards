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
