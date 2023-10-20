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
import { useCreateCardMutation, useGetCardsQuery } from '@/services/decks'
export const Cards = () => {
  const { deckID } = useParams()

  const { data } = useGetCardsQuery({ id: deckID as string })
  const [createCard] = useCreateCardMutation()

  const onClickCreateCard = () => {
    createCard({ id: deckID as string, question: 'Laugh', answer: 'Haha' })
  }

  return (
    <div className={s.cards}>
      <Button className={s.button} onClick={onClickCreateCard}>
        <Typography variant="subtitle2" as="span">
          Add New Card
        </Typography>
      </Button>
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
              <TableCell>{card.question}</TableCell>
              <TableCell>{card.answer}</TableCell>
              <TableCell>{new Date(card.updated).toLocaleDateString()}</TableCell>
              <TableCell>{card.grade}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
