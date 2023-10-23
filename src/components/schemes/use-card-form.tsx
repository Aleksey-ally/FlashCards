import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const addCardSchema = z.object({
  question: z.string().nonempty('Field is required!'),
  answer: z.string().nonempty('Field is required!'),
})

export type CardFormValues = z.infer<typeof addCardSchema>
export const useCardForm = (defaultValues: CardFormValues) => {
  return useForm<CardFormValues>({
    resolver: zodResolver(addCardSchema),
    defaultValues,
  })
}
