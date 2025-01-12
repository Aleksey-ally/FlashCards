import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReAuth } from '@/services/base-query-with-refetch.ts'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Decks', 'Cards', 'Me', 'Learn'],
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
})
