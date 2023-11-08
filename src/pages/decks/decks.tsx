import { useState } from 'react'

import { NavLink } from 'react-router-dom'

import s from './decks.module.scss'

import { Edit, PlayArrow, Trash } from '@/assets'
import Button from '@/components/ui/button/button.tsx'
import { Modal } from '@/components/ui/modal'
import { Pagination } from '@/components/ui/pagination'
import {
  Column,
  Sort,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'
import { AddDeckModal } from '@/pages/decks/add-deck/add-deck-modale.tsx'
import { DecksFilter } from '@/pages/decks/decks-filter'
import { EditDeck } from '@/pages/decks/edit-deck'
import { useDebounce } from '@/pages/utils/use-debounce.ts'
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
const columns: Column[] = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
  },
  {
    key: 'cardsCount',
    title: 'Cards',
    sortable: true,
  },
  {
    key: 'updated',
    title: 'Last Updated',
    sortable: true,
  },
  {
    key: 'created',
    title: 'Created by',
    sortable: true,
  },
  {
    key: 'icons',
    title: '',
  },
]

export const Decks = () => {
  const dispatch = useAppDispatch()
  const cardsCount = useAppSelector(state => state.deckSlice.cardsCount)
  const searchByName = useAppSelector(state => state.deckSlice.searchByName)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [currentDeck, setCurrentDeck] = useState<CurrentDeck>({} as CurrentDeck)
  const [tabValue, setTabValue] = useState('all')
  const currentPage = useAppSelector(state => state.deckSlice.currentPage)
  const orderBy = useAppSelector(state => state.deckSlice.orderBy)

  const setCardsCount = (value: number[]) => {
    dispatch(decksSlice.actions.setCardsCount(value))
  }
  const setSearchByName = (value: string) => {
    dispatch(decksSlice.actions.setSearchByName(value))
  }
  const setOrderBy = (value: Sort) => {
    dispatch(decksSlice.actions.setOrderBy(value))
  }
  const setCurrentPage = (value: number) => {
    dispatch(decksSlice.actions.setCurrentPage(value))
  }
  const debouncedCardsCount = useDebounce(cardsCount, 300)
  const debouncedSearchName = useDebounce(searchByName, 500)
  const sortedString = orderBy ? `${orderBy.key}-${orderBy.direction}` : null

  const { currentData: user } = useMeQuery()
  const { data } = useGetDecksQuery({
    name: debouncedSearchName,
    authorId: tabValue === 'my cards' ? user?.id : undefined,
    minCardsCount: debouncedCardsCount[0],
    maxCardsCount: debouncedCardsCount[1],
    orderBy: sortedString,
    currentPage,
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
              Add New Deck
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
          <TableHeader columns={columns} sort={orderBy} onSort={sort => setOrderBy(sort)} />
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
              <TableCell>
                <div className={s.iconsContainer}>
                  <PlayArrow className={s.icon} />
                  {deck.author.id === user?.id && (
                    <>
                      <EditDeck
                        trigger={<Edit className={s.icon} />}
                        buttonTitle="Save Changes"
                        onSubmit={data => editDeckCallback(deck.id, data)}
                        values={{
                          name: deck.name,
                          isPrivate: deck.isPrivate,
                          cover: deck.cover,
                        }}
                      />

                      <Trash
                        className={s.icon}
                        onClick={() => onClickDeleteDeckIcon(deck.id, deck.name)}
                      />
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={s.pagination}>
        <Pagination
          count={data?.pagination.totalPages || 1}
          page={currentPage}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  )
}
