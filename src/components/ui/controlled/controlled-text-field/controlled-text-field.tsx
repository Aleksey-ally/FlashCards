import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { TextField, TextFieldProps } from '../../text-field'

type ControlledTextFieldProps<TFieldValues extends FieldValues> = UseControllerProps<TFieldValues> &
  Omit<TextFieldProps, 'onChange' | 'value' | 'name'>

export const ControlledTextField = <TFieldValues extends FieldValues>({
  control,
  name,
  rules,
  shouldUnregister,
  defaultValue,
  ...textFieldProps
}: ControlledTextFieldProps<TFieldValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
    rules,
    shouldUnregister,
    defaultValue,
  })

  return <TextField {...textFieldProps} {...field} errorMessage={error?.message} />
}
