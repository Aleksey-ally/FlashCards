import { ComponentPropsWithoutRef } from 'react'

import s from './card.module.scss'

type Props = {} & ComponentPropsWithoutRef<'div'>

export const Card = ({ className = '', ...rest }: Props) => {
  return <div className={`${s.card} ${className}`} {...rest}></div>
}

// import { ComponentPropsWithoutRef, ElementType } from 'react'
//
// import s from './button.module.scss'
//
// export type ButtonProps<T extends ElementType = 'button'> = {
//   as?: T
//   variant?: 'primary' | 'secondary' | 'tertiary' | 'link'
//   fullWidth?: boolean
// } & ComponentPropsWithoutRef<T>
//
// export const Button = <T extends ElementType = 'button'>(props: ButtonProps<T>) => {
//   const { variant = 'primary', fullWidth, className, as: Component = 'button', ...rest } = props
//
//   return (
//       <Component className={`${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`} {...rest} />
//   )
// }
