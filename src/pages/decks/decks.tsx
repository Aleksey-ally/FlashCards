import { useState } from 'react'

import { NavLink } from 'react-router-dom'

import s from './decks.module.scss'

import { Edit } from '@/assets'
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
import { Typography } from '@/components/ui/typography'
import { AddDeckModal } from '@/pages/decks/add-deck/add-deck-modale.tsx'
import { DecksFilter } from '@/pages/decks/decks-filter'
import { EditDeck } from '@/pages/decks/edit-deck'
import { useDebounce } from '@/pages/decks/use-deck-debounce.ts'
import { useMeQuery } from '@/services/auth/auth.service.ts'
import {
  Deck,
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
} from '@/services/decks'
import { decksSlice } from '@/services/decks/deck.slice.ts'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'

type CurrentDeck = Pick<Deck, 'id' | 'name'>

export const Decks = () => {
  const dispatch = useAppDispatch()
  const cardsCount = useAppSelector(state => state.deckSlice.cardsCount)
  const searchByName = useAppSelector(state => state.deckSlice.searchByName)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [currentDeck, setCurrentDeck] = useState<CurrentDeck>({} as CurrentDeck)
  const [tabValue, setTabValue] = useState('all')

  const setCardsCount = (value: number[]) => {
    dispatch(decksSlice.actions.setCardsCount(value))
  }
  const setSearchByName = (value: string) => {
    dispatch(decksSlice.actions.setSearchByName(value))
  }

  const debouncedCardsCount = useDebounce(cardsCount, 300)
  const debouncedSearchName = useDebounce(searchByName, 500)
  const { data: user } = useMeQuery()
  const { data } = useGetDecksQuery({
    name: debouncedSearchName,
    authorId: tabValue === 'my cards' ? user?.id : undefined,
    minCardsCount: debouncedCardsCount[0],
    maxCardsCount: debouncedCardsCount[1],
  })
  const [updateDeck] = useUpdateDeckMutation()
  const [createDeck] = useCreateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()

  const onClickAddNewDeckButton = (data: FormData) => {
    createDeck(data)
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
  const onClearFilter = () => {
    setSearchByName('')
    setTabValue('all')
    setCardsCount([0, data?.maxCardsCount || 100])
  }
  const editDeckCallback = (id: any, data: FormData) => {
    updateDeck({ id: id, body: data })
  }

  return (
    <div className={s.pageDeck}>
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
      <DecksFilter
        inputValue={searchByName}
        onChangeInputValue={value => setSearchByName(value)}
        tabValue={tabValue}
        tabLabel={'Show packs cards'}
        onChangeTabValue={setTabValue}
        sliderValue={cardsCount}
        minSliderValue={data?.minCardsCount}
        maxSliderValue={data?.maxCardsCount}
        sliderLabel={'Number of cards'}
        onChangeSliderValue={setCardsCount}
        onClearFilter={onClearFilter}
      />
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
              <TableCell>
                <NavLink className={s.deckName} to={`/cards/${deck.id}`}>
                  {deck.cover && (
                    <img className={s.image} src={deck.cover} alt="deck-cover-image" />
                  )}
                  {deck.name}
                </NavLink>
              </TableCell>
              <TableCell>{deck.cardsCount}</TableCell>
              <TableCell>{new Date(deck.updated).toLocaleDateString()}</TableCell>
              <TableCell>{deck.author.name}</TableCell>
              <TableCell className={s.blockButton}>
                {deck.author.id === user?.id && (
                  <EditDeck
                    trigger={<Edit />}
                    buttonTitle="Save Changes"
                    onSubmit={data => editDeckCallback(deck.id, data)}
                    values={{
                      name: deck.name,
                      isPrivate: deck.isPrivate,
                      cover: deck.cover,
                    }}
                  />
                )}
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
