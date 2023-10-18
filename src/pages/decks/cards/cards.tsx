import { useParams } from 'react-router-dom'

import s from './cards.module.scss'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/table'
import { useGetCardsQuery } from '@/services/decks'
export const Cards = () => {
  const { deckID } = useParams()

  const { data } = useGetCardsQuery({ id: deckID as string })

  return (
    <div className={s.cards}>
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
