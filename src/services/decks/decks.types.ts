export type Decks = {
  items: Deck[]
  pagination: Pagination
  maxCardsCount: number
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

export type GetCardsParams = {
  id: string
  question?: string
  answer?: string
  orderBy?: string
  currentPage?: number
  itemsPerPage?: number
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

export type Card = {
  id: string
  deckId: string
  userId: string
  question: string
  answer: string
  shots: number
  answerImg: string
  questionImg: string
  questionVideo: string
  answerVideo: string
  rating: number
  created: string
  updated: string
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
