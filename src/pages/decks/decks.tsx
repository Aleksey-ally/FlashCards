import { useState } from 'react'

import { NavLink } from 'react-router-dom'

import s from './decks.module.scss'

import { Edit, PlayArrow, Trash } from '@/assets'
import Button from '@/components/ui/button/button'
import { Pagination } from '@/components/ui/pagination'
import {
  Column,
  Sort,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'
import { AddEditDeckModal } from '@/pages/decks/add-deck'
import { DecksFilter } from '@/pages/decks/decks-filter'
import { DeleteDeckModal } from '@/pages/decks/delete-deck-modal/delete-deck-modal'
import { useDebounce } from '@/pages/utils/use-debounce'
import { useMeQuery } from '@/services/auth/auth.service'
import { useGetDecksQuery } from '@/services/decks'
import { decksSlice } from '@/services/decks/deck.slice'
import { useAppDispatch, useAppSelector } from '@/services/store'

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
  const currentPage = useAppSelector(state => state.deckSlice.currentPage)
  const orderBy = useAppSelector(state => state.deckSlice.orderBy)
  const itemsPerPage = useAppSelector(state => state.deckSlice.itemsPerPage)

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [tabValue, setTabValue] = useState('all')

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
  const setItemsPerPage = (value: number) => {
    dispatch(decksSlice.actions.setItemsPerPage(value))
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
    itemsPerPage,
  })

  // console.log(data?.maxCardsCount)

  const onClearFilter = () => {
    setSearchByName('')
    setTabValue('all')
    setCardsCount([0, data?.maxCardsCount || 100])
  }

  return (
    <div className={s.pageDeck}>
      <AddEditDeckModal
        trigger={
          <Button className={s.button}>
            <Typography variant="subtitle2" as="span">
              Add New Deck
            </Typography>
          </Button>
        }
        buttonTitle="Add new deck"
        type="Add deck"
      ></AddEditDeckModal>
      <DecksFilter
        inputValue={searchByName}
        onChangeInputValue={value => setSearchByName(value)}
        tabValue={tabValue}
        tabLabel={'Show packs cards'}
        onChangeTabValue={setTabValue}
        sliderValue={cardsCount}
        minSliderValue={0}
        maxSliderValue={100}
        sliderLabel={'Number of cards'}
        onChangeSliderValue={setCardsCount}
        onClearFilter={onClearFilter}
      />

      <Table>
        <TableHeader columns={columns} sort={orderBy} onSort={sort => setOrderBy(sort)} />

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
                  <NavLink to={`/card/${deck.id}`}>
                    <PlayArrow />
                  </NavLink>
                  {deck.author.id === user?.id && (
                    <>
                      <AddEditDeckModal
                        trigger={<Edit className={s.icon} />}
                        buttonTitle="Save Changes"
                        values={{
                          name: deck.name,
                          isPrivate: deck.isPrivate,
                          cover: deck.cover,
                        }}
                        deckId={deck.id}
                        type={'Edit deck'}
                      />

                      <DeleteDeckModal
                        open={openModal}
                        onClose={setOpenModal}
                        trigger={<Trash className={s.icon} />}
                        deckName={deck.name}
                        deckId={deck.id}
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
          perPage={itemsPerPage}
          onPerPageChange={value => setItemsPerPage(Number(value))}
          perPageOptions={[10, 20, 30, 40, 50]}
        />
      </div>
    </div>
  )
}
