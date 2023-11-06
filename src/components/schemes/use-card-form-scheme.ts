import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const createCardSchema = z.object({
  question: z.string().nonempty('Field is required!').min(3),
  answer: z.string().nonempty('Field is required!').min(3),
})

export type CreateCardForm = z.infer<typeof createCardSchema>

export const useCardFormScheme = (defaultValues: CreateCardForm) => {
  return useForm<CreateCardForm>({
    resolver: zodResolver(createCardSchema),
    defaultValues,
  })
}
