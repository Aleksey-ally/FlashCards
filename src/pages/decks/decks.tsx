import { ChangeEvent, useState } from 'react'

import s from './decks.module.scss'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/table'
import { TextField } from '@/components/ui/text-field'
import { Typography } from '@/components/ui/typography'
import { useCreateDeckMutation, useGetDecksQuery } from '@/services/decks'

export const Decks = () => {
  const [name, setName] = useState<string>('')
  const { data } = useGetDecksQuery()
  const [createDeck] = useCreateDeckMutation()

  const onClickAddNewDeckButton = () => {
    createDeck({ name: 'Temp test deck' })
  }
  const onChangeSearchTextField = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }

  return (
    <div className={s.pageDeck}>
      <Button className={s.button} onClick={onClickAddNewDeckButton}>
        <TextField isSearch value={name} onChange={onChangeSearchTextField} />
        <Typography variant="subtitle2" as="span">
          Add new Deck
        </Typography>
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Cards</TableHeadCell>
            <TableHeadCell>Last Updated</TableHeadCell>
            <TableHeadCell>Created by</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.items?.map(deck => (
            <TableRow key={deck.id}>
              <TableCell>{deck.name}</TableCell>
              <TableCell>{deck.cardsCount}</TableCell>
              <TableCell>{new Date(deck.updated).toLocaleDateString()}</TableCell>
              <TableCell>{deck.author.name}</TableCell>
              <TableCell>icons...</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
