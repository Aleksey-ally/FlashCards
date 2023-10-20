import {
  Card,
  Cards,
  CreateCardArgs,
  CreateDeckArgs,
  Deck,
  Decks,
  DeleteDeck,
  DeleteDeckParams,
  GetCardsParams,
  GetDecksParams,
} from './decks.types.ts'

import { baseApi } from '@/services/base-api.ts'

export const DecksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<Decks, GetDecksParams | void>({
        query: params => ({
          url: 'v1/decks',
          params: params ?? {},
        }),
        providesTags: ['Decks'],
      }),
      createDeck: builder.mutation<Deck, CreateDeckArgs>({
        query: body => ({
          url: 'v1/decks',
          method: 'POST',
          body,
        }),
        invalidatesTags: ['Decks'],
      }),
      deleteDeck: builder.mutation<DeleteDeck, DeleteDeckParams>({
        query: params => ({
          url: `v1/decks/${params.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Decks'],
      }),
      getCards: builder.query<Cards, GetCardsParams>({
        query: params => {
          const { id, ...otherParams } = params

          return {
            url: `v1/decks/${id}/cards`,
            params: otherParams,
          }
        },
        providesTags: ['Cards'],
      }),
      createCard: builder.mutation<Card, CreateCardArgs>({
        query: params => {
          const { id, ...body } = params

          return {
            url: `v1/decks/${id}/cards`,
            method: 'POST',
            body,
          }
        },
        invalidatesTags: ['Cards'],
      }),
    }
  },
})

export const {
  useGetDecksQuery,
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetCardsQuery,
  useCreateCardMutation,
} = DecksService
