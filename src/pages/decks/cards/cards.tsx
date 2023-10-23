import { useParams } from 'react-router-dom'

import s from './cards.module.scss'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'
import { AddCardModal } from '@/pages/decks/cards/add-card-modale/add-card-modale.tsx'
import { useCreateCardMutation, useGetCardsQuery } from '@/services/decks'

export const Cards = () => {
  const { deckID } = useParams()

  const { data } = useGetCardsQuery({ id: deckID as string })
  const [createCard] = useCreateCardMutation()

  const onClickCreateCard = (body: FormData) => {
    createCard({ id: deckID as string, body })
  }

  return (
    <div className={s.cards}>
      <AddCardModal
        trigger={
          <Button className={s.button}>
            <Typography variant="subtitle2" as="span">
              Add New Card
            </Typography>
          </Button>
        }
        buttonTitle={'Add New Card'}
        onSubmit={onClickCreateCard}
      ></AddCardModal>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Question</TableHeadCell>
            <TableHeadCell>Answer</TableHeadCell>
            <TableHeadCell>Last Updated</TableHeadCell>
            <TableHeadCell>Grade</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.items?.map(card => (
            <TableRow key={card.id}>
              <TableCell>
                {card.questionImg && (
                  <img className={s.image} src={card.questionImg} alt="deck-cover-image" />
                )}
                {card.question}
              </TableCell>
              <TableCell>
                {card.answerImg && (
                  <img className={s.image} src={card.answerImg} alt="deck-cover-image" />
                )}
                {card.answer}
              </TableCell>
              <TableCell>{new Date(card.updated).toLocaleDateString()}</TableCell>
              <TableCell>{card.grade}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
