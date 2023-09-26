import * as CheckboxRadix from '@radix-ui/react-checkbox'

import s from './checkbox.module.scss'

import { CheckMark } from '@/assets/icons/check-mark'
import { Typography } from '@/components/ui/typography'

type Props = {
  className?: string
  label?: string
  checked?: boolean
  onValueChange?: (checked: boolean) => void
  disabled?: boolean
  required?: boolean
}

export const Checkbox = ({
  className = '',
  label,
  checked,
  onValueChange,
  disabled,
  required,
}: Props) => {
  const classNames = {
    label: `${s.label} ${disabled ? s.labelDisabled : ''}`,
    checkBox: `${s.default} ${!checked ? s.uncheck : ''} ${className}`,
  }

  return (
    <Typography className={classNames.label} as={'label'} variant={'body2'}>
      <CheckboxRadix.Root
        className={classNames.checkBox}
        checked={checked}
        onCheckedChange={onValueChange}
        disabled={disabled}
        required={required}
      >
        <CheckboxRadix.Indicator>
          {checked && <CheckMark disabled={disabled} />}
        </CheckboxRadix.Indicator>
      </CheckboxRadix.Root>
      {label}
    </Typography>
  )
}
