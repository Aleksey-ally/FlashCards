export type Decks = {
  items: Deck[]
  pagination: Pagination
  maxCardsCount: number
}

export type Deck = {
  author: Author
  id: string
  userId: string
  name: string
  isPrivate?: boolean
  shots: number
  cover?: string | null
  rating: number
  created: string
  updated: string
  cardsCount: number
}

export type Author = {
  id: string
  name: string
}

export type Pagination = {
  currentPage: number
  itemsPerPage: number
  totalPages: number
  totalItems: number
}

export type CreateDeckArgs = Pick<Deck, 'name' | 'cover' | 'isPrivate'>
export type DeleteDeckParams = Pick<Deck, 'id'>

type Direction = 'asc' | 'desc'
type Field = 'name' | 'updated'
export type GetDecksParams = {
  minCardsCount?: string
  maxCardsCount?: string
  name?: string
  authorId?: string
  orderBy?: `${Field}-${Direction}`
  currentPage?: number
  itemsPerPage?: number
}

export type DeleteDeck = Omit<Deck, 'author'>
