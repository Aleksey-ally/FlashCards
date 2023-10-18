import { ChangeEvent, useState } from 'react'

import { NavLink } from 'react-router-dom'

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
import { AddDeckModal } from '@/pages/decks/add-deck/add-deck-modale.tsx'
import {
  CreateDeckArgs,
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

  const onClickAddNewDeckButton = (data: FormData) => {
    // Extract the necessary data from the FormData and create a CreateDeckArgs object
    const name = data.get('name')
    const isPrivate = data.get('isPrivate')
    const cover = data.get('cover')

    const createDeckArgs: CreateDeckArgs = {
      name: name as string,
      isPrivate: isPrivate === 'true', // Assuming isPrivate is a boolean
      cover: cover as string | null,
    }

    createDeck(createDeckArgs)
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
      <AddDeckModal
        trigger={
          <Button className={s.button}>
            <Typography variant="subtitle2" as="span">
              Add new Deck
            </Typography>
          </Button>
        }
        buttonTitle={'Add New Deck'}
        onSubmit={onClickAddNewDeckButton}
      ></AddDeckModal>

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
              <NavLink className={s.deckName} to={`/cards/${deck.id}`}>
                <TableCell>
                  {deck.cover && (
                    <img className={s.image} src={deck.cover} alt="deck-cover-image" />
                  )}
                  {deck.name}
                </TableCell>
              </NavLink>
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
