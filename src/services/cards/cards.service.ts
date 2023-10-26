import { baseApi } from '@/services/base-api.ts'
import { Card, DeleteCardParams, UpdateCardParams } from '@/services/cards/cards.types.ts'

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
      updateCard: builder.mutation<Card, UpdateCardParams>({
        query: ({ id, body }) => ({
          url: `v1/cards/${id}`,
          method: 'PATCH',
          body,
        }),
        invalidatesTags: ['Cards'],
      }),
    }
  },
})

export const { useDeleteCardMutation, useUpdateCardMutation } = CardsService
