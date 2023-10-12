import { ChangeEvent, useState } from 'react'

import s from './decks.module.scss'

import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
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
import {
  Deck,
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
} from '@/services/decks'

type CurrentDeck = Pick<Deck, 'id' | 'name'>

export const Decks = () => {
  const [name, setName] = useState<string>('')
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [currentDeck, setCurrentDeck] = useState<CurrentDeck>({} as CurrentDeck)

  const { data } = useGetDecksQuery({ name })

  const [createDeck] = useCreateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()

  const onClickAddNewDeckButton = () => {
    createDeck({ name: 'Temp test deck' })
  }
  const onChangeSearchTextField = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }

  const onClickDeleteDeckIcon = (id: string, name: string) => {
    setCurrentDeck({ id, name })
    setOpenModal(true)
  }

  const onClickDeleteDeckButton = () => {
    deleteDeck({ id: currentDeck.id })
    setOpenModal(false)
  }

  const onClickCloseButton = () => {
    setOpenModal(false)
  }

  return (
    <div className={s.pageDeck}>
      <Modal title={'Delete Deck'} open={openModal} onClose={onClickCloseButton}>
        <Typography className={s.textModal} variant="body2" as="span">
          Do you really want to remove <b>Deck {currentDeck.name}?</b>
          {'\n'}
          All cards will be deleted.
        </Typography>
        <div className={s.blockButton}>
          <Button variant="secondary" onClick={onClickCloseButton}>
            <Typography variant="subtitle2" as="span">
              Cancel
            </Typography>
          </Button>
          <Button onClick={onClickDeleteDeckButton}>
            <Typography variant="subtitle2" as="span">
              Delete Pack
            </Typography>
          </Button>
        </div>
      </Modal>
      <Button className={s.button} onClick={onClickAddNewDeckButton}>
        <Typography variant="subtitle2" as="span">
          Add new Deck
        </Typography>
      </Button>
      <div className={s.filterBlock}>
        <TextField
          placeholder={'input search'}
          className={s.searchDecks}
          isSearch
          value={name}
          onChange={onChangeSearchTextField}
        />
      </div>
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
              <TableCell>
                <button
                  className={s.tempButton}
                  onClick={() => onClickDeleteDeckIcon(deck.id, deck.name)}
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
