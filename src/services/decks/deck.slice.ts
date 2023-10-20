import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  cardsCount: [0, 100],
  searchByName: '',
  currentPage: 1,
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
  },
})
