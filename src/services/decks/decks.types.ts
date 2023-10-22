import { Card } from '@/services/cards/cards.types.ts'

export type Decks = {
  items: Deck[]
  pagination: Pagination
  maxCardsCount: number
  minCardsCount?: number
}

export type Deck = {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover: string | null
  rating: number
  isDeleted?: boolean | null
  isBlocked?: boolean | null
  created: string
  updated: string
  cardsCount: number
  author: Author
}

export type Author = {
  id: string
  name: string
}

export type DecksResponse = PaginatedEntity<Deck> & {
  maxCardsCount: number
  minCardsCount: number
}
export type PaginatedEntity<T> = {
  pagination: Pagination
  items: T[]
}
export type Pagination = {
  currentPage: number
  itemsPerPage: number
  totalPages: number
  totalItems: number
}

export type DeleteDeckParams = Pick<Deck, 'id'>

export type GetDecksParams = {
  minCardsCount?: number
  maxCardsCount?: number
  name?: string
  authorId?: string
  orderBy?: string | null
  currentPage?: number
  itemsPerPage?: number
}

export type DeleteDeck = Omit<Deck, 'author'>

export type GetCardsParams = {
  id: string
  question?: string
  answer?: string
  orderBy?: string
  currentPage?: number
  itemsPerPage?: number
  minCardsCount?: number
  maxCardsCount?: number
}

export type Cards = {
  items: GetCard[]
  pagination: {
    currentPage: number
    itemsPerPage: number
    totalPages: number
    totalItems: number
  }
}

export type GetCard = { grade: string } & Omit<Card, 'rating'>

export type UpdateDeckParamsType = {
  id: Pick<Deck, 'id'>
  body: FormData
}

export type CreateCardArgs = {
  id: string
  question: string
  answer: string
  questionImg?: string
  answerImg?: string
  questionVideo?: string
  answerVideo?: string
}
