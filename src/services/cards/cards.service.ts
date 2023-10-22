import { baseApi } from '@/services/base-api.ts'
import { DeleteCardParams } from '@/services/cards/cards.types.ts'

export const CardsService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      deleteCard: builder.mutation<void, DeleteCardParams>({
        query: ({ id }) => ({
          url: `v1/cards/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Cards'],
      }),
    }
  },
})

export const { useDeleteCardMutation } = CardsService
