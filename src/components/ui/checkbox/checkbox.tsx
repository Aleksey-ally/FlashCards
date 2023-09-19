import { ReactNode } from 'react'

import * as CheckboxRadix from '@radix-ui/react-checkbox'

import s from './checkbox.module.scss'

import { CheckMark } from '@/assets/icons/check-mark'
import { Typography } from '@/components/ui/typography'

type Props = {
  className?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  required?: boolean
  children?: ReactNode
}

export const Checkbox = ({
  className = '',
  checked,
  onChange,
  disabled,
  required,
  children,
}: Props) => {
  return (
    <div className={s.wrapper}>
      <Typography className={`${s.label} ${disabled ? s.labelDisabled : ''}`} as={'label'}>
        <CheckboxRadix.Root
          className={`${s.default} ${!checked ? s.uncheck : ''} ${className}`}
          checked={checked}
          onCheckedChange={onChange}
          disabled={disabled}
          required={required}
        >
          <CheckboxRadix.Indicator>
            {checked && <CheckMark disabled={disabled} />}
          </CheckboxRadix.Indicator>
        </CheckboxRadix.Root>
        {children}
      </Typography>
    </div>
  )
}
