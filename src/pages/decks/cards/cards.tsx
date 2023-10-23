import { useState } from 'react'

import { useParams } from 'react-router-dom'

import s from './cards.module.scss'

import Button from '@/components/ui/button/button'
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
import { AddCardModal } from '@/pages/decks/cards/add-card-modale/add-card-modale.tsx'
import { useDeleteCardMutation } from '@/services/cards/cards.service.ts'
import { Card } from '@/services/cards/cards.types.ts'
import { useCreateCardMutation, useGetCardsQuery } from '@/services/decks'
type CurrentCard = Pick<Card, 'id' | 'question'>

export const Cards = () => {
  const { deckID } = useParams()

  const { data } = useGetCardsQuery({ id: deckID as string })
  const [createCard] = useCreateCardMutation()
  const [deleteCard] = useDeleteCardMutation()

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [currentCard, setCurrentCard] = useState<CurrentCard>({} as CurrentCard)

  const onClickCreateCard = (body: FormData) => {
    createCard({ id: deckID as string, body })
  }

  const onClickDeleteCard = () => {
    deleteCard({ id: currentCard.id })
    setOpenModal(false)
  }

  const onClickCloseButton = () => {
    setOpenModal(false)
  }

  const onClickDeleteCardIcon = (id: string, question: string) => {
    setCurrentCard({ id, question })
    setOpenModal(true)
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
              <TableCell>
                <button
                  className={s.tempButton}
                  onClick={() => onClickDeleteCardIcon(card.id, card.question)}
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
