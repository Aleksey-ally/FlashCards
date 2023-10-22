import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Sort } from '@/components/ui/table'

const initialState = {
  cardsCount: [0, 100],
  searchByName: '',
  currentPage: 1,
  orderBy: null as Sort,
}

export const decksSlice = createSlice({
  name: 'deckSlice',
  initialState,
  reducers: {
    setCardsCount: (state, action: PayloadAction<number[]>) => {
      state.cardsCount = action.payload
      state.currentPage = 1
    },
    setSearchByName: (state, action: PayloadAction<string>) => {
      state.searchByName = action.payload
      state.currentPage = 1
    },
    setOrderBy: (state, action: PayloadAction<Sort>) => {
      state.orderBy = action.payload
      state.currentPage = 1
    },
  },
})
