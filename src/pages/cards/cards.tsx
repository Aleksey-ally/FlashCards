import { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import s from './cards.module.scss'

import { ArrowBackOutline, Edit, MoreVertical, PlayArrow, Trash } from '@/assets'
import Button from '@/components/ui/button/button'
import { Dropdown } from '@/components/ui/dropdown'
import { DropdownItem } from '@/components/ui/dropdown/dropdownItem'
import { Modal } from '@/components/ui/modal'
import { Pagination } from '@/components/ui/pagination'
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
import { AddCardModal } from '@/pages/cards/add-card-modale'
import { EditCardModal } from '@/pages/cards/edit-card-modale'
import { AddEditDeckModal } from '@/pages/decks'
import { DeleteDeckModal } from '@/pages/decks/delete-deck-modal'
import { useDebounce } from '@/pages/utils'
import { errorOptions, successOptions } from '@/pages/utils/toastify-options/toastify-options.ts'
import { cardsSlice } from '@/services/cards/card.slice.ts'
import { useDeleteCardMutation, useUpdateCardMutation } from '@/services/cards/cards.service.ts'
import { Card } from '@/services/cards/cards.types.ts'
import { useCreateCardMutation, useGetCardsQuery, useGetDeckQuery } from '@/services/decks'
import { useAppSelector } from '@/services/store.ts'

type CurrentCard = Pick<Card, 'id' | 'question'>

export const Cards = () => {
  const { deckID } = useParams()
  const id = deckID as string
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const searchByQuestion = useAppSelector(state => state.cardSlice.searchByName)
  const currentPage = useAppSelector(state => state.cardSlice.currentPage)

  const debouncedSearchByQuestion = useDebounce(searchByQuestion, 500)
  const { data: cards } = useGetCardsQuery({
    id,
    question: debouncedSearchByQuestion,
    currentPage,
  })
  const { data: currentDeck } = useGetDeckQuery({ id })
  const [createCard] = useCreateCardMutation()
  const [deleteCard] = useDeleteCardMutation()
  const [updateCard] = useUpdateCardMutation()

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openDeleteDeckModal, setOpenDeleteDeckModal] = useState<boolean>(false)

  const [currentCard, setCurrentCard] = useState<CurrentCard>({} as CurrentCard)

  useEffect(() => {
    dispatch(cardsSlice.actions.setCurrentPage(1))
  }, [])
  const setCurrentPage = (value: number) => {
    dispatch(cardsSlice.actions.setCurrentPage(value))
  }
  const onClickCreateCard = (body: FormData) => {
    createCard({ id: deckID as string, body })
      .unwrap()
      .then(() => {
        const newQuestionCard = body.get('question')

        toast.success(`Your card ${newQuestionCard} created successfully`, successOptions)
      })
      .catch(() => {
        toast.error('Deck not found', errorOptions)
      })
  }
  const onClickDeleteCard = () => {
    deleteCard({ id: currentCard.id })
      .unwrap()
      .then(() => {
        toast.success(`Your card ${currentCard.question} deleted successfully`, successOptions)
      })
      .catch(() => {
        toast.error('Card not found', errorOptions)
      })
    setOpenModal(false)
  }

  const onClickCloseButton = () => {
    setOpenModal(false)
  }

  const onClickDeleteCardIcon = (id: string, question: string) => {
    setCurrentCard({ id, question })
    setOpenModal(true)
  }

  const onClickUpdateCard = (id: string, body: FormData) => {
    updateCard({ id, body })
      .unwrap()
      .then(() => {
        const questionCard = body.get('question')

        toast.success(`Your card ${questionCard} updated successfully`, successOptions)
      })
      .catch(() => {
        toast.error('Card not found', errorOptions)
      })
  }

  const setSearchByName = (value: string) => {
    dispatch(cardsSlice.actions.setSearchByName(value))
  }

  const backDeckHandler = () => {
    navigate('/')
  }

  return (
    <div className={s.cards}>
      {cards?.items?.length || searchByQuestion.length ? (
        <>
          <div className={s.backDeck}>
            <Typography
              as={'label'}
              variant={'body2'}
              htmlFor={'backDeck'}
              onClick={backDeckHandler}
              className={s.label}
            >
              <ArrowBackOutline id={'backDeck'} className={s.arrowBackOutline} />
              Back to Decks List
            </Typography>
          </div>
          <div className={s.titleBlock}>
            <Typography variant={'large'} className={s.title}>
              {currentDeck?.name}
              <Dropdown trigger={<MoreVertical />}>
                <DropdownItem>
                  <PlayArrow />
                </DropdownItem>
                <DropdownItem onSelect={e => e.preventDefault()}>
                  <AddEditDeckModal
                    trigger={<Edit className={s.icon} />}
                    buttonTitle="Save Changes"
                    values={currentDeck}
                    deckId={deckID}
                    type={'Edit deck'}
                  />
                </DropdownItem>
                <DropdownItem onSelect={e => e.preventDefault()}>
                  <DeleteDeckModal
                    open={openDeleteDeckModal}
                    onClose={setOpenDeleteDeckModal}
                    trigger={<Trash />}
                    deckName={currentDeck?.name}
                    deckId={currentDeck?.id}
                  />
                </DropdownItem>
              </Dropdown>
            </Typography>
            <AddCardModal
              title={'Add New Card'}
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
          </div>
          <div className={s.searchCard}>
            <TextField
              placeholder={'Input card question'}
              isSearch
              value={searchByQuestion}
              onValueChange={setSearchByName}
            />
          </div>
          <Modal title={'Delete Card'} open={openModal} onClose={onClickCloseButton}>
            <Typography className={s.textModal} variant="body2" as="span">
              Do you really want to remove <b>Card {currentCard.question}?</b>
              {'\n'}
              Card will be deleted permanently.
            </Typography>
            <div className={s.blockButton}>
              <Button variant="secondary" onClick={onClickCloseButton}>
                <Typography variant="subtitle2" as="span">
                  Cancel
                </Typography>
              </Button>
              <Button onClick={onClickDeleteCard}>
                <Typography variant="subtitle2" as="span">
                  Delete Card
                </Typography>
              </Button>
            </div>
          </Modal>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeadCell>Question</TableHeadCell>
                <TableHeadCell>Answer</TableHeadCell>
                <TableHeadCell>Last Updated</TableHeadCell>
                <TableHeadCell>Grade</TableHeadCell>
                <TableHeadCell></TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cards?.items?.map(card => (
                <TableRow key={card.id}>
                  <TableCell>
                    <div className={s.descriptionWithImg}>
                      {card.questionImg && (
                        <img className={s.image} src={card.questionImg} alt="deck-cover-image" />
                      )}
                      {card.question}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={s.descriptionWithImg}>
                      {card.answerImg && (
                        <img className={s.image} src={card.answerImg} alt="deck-cover-image" />
                      )}
                      {card.answer}
                    </div>
                  </TableCell>
                  <TableCell>{new Date(card.updated).toLocaleDateString()}</TableCell>
                  <TableCell>{card.grade}</TableCell>
                  <TableCell>
                    <div className={s.iconsContainer}>
                      <EditCardModal
                        title={'Edit Card'}
                        trigger={<Edit />}
                        buttonTitle={'Edit Card'}
                        onSubmit={body => onClickUpdateCard(card.id, body)}
                      ></EditCardModal>
                      <Trash
                        className={s.trash}
                        onClick={() => onClickDeleteCardIcon(card.id, card.question)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <div className={s.emptyDeck}>
          <div className={s.backDeck}>
            <Typography
              as={'label'}
              variant={'body2'}
              htmlFor={'backDeck'}
              onClick={backDeckHandler}
              className={s.label}
            >
              <ArrowBackOutline id={'backDeck'} className={s.arrowBackOutline} />
              Back to Decks List
            </Typography>
          </div>
          <Typography className={s.title} variant={'large'}>
            {currentDeck?.name}
          </Typography>

          <Typography className={s.description} variant={'body1'}>
            This pack is empty. Click add new card to fill this pack
          </Typography>
          <AddCardModal
            title={'Add New Card'}
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
        </div>
      )}
      <div className={s.pagination}>
        <Pagination
          count={cards?.pagination.totalPages || 1}
          page={currentPage}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  )
}
