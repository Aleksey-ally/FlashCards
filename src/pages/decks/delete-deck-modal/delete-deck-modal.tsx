import { ReactNode } from 'react'

import { useNavigate } from 'react-router-dom'

import s from './delete-deck-modal.module.scss'

import Button from '@/components/ui/button/button.tsx'
import { Modal } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import { useDeleteDeckMutation } from '@/services/decks'

type DeleteDeckModalProps = {
  deckName?: string
  deckId?: string
  trigger?: ReactNode
  open: boolean
  onClose: (open: boolean) => void
}
export const DeleteDeckModal = ({
  deckName,
  deckId,
  trigger,
  open,
  onClose,
}: DeleteDeckModalProps) => {
  const [deleteDeck] = useDeleteDeckMutation()
  const navigate = useNavigate()
  const onClickDeleteDeckButton = () => {
    deleteDeck({ id: deckId })
    onClose(false)
    navigate('/')
  }

  return (
    <Modal title={'Delete Deck'} open={open} onClose={onClose} trigger={trigger}>
      <Typography className={s.textModal} variant="body2" as="span">
        Do you really want to remove <b>Deck {deckName}?</b>
        {'\n'}
        All cards will be deleted.
      </Typography>
      <div className={s.blockButton}>
        <Button
          variant="secondary"
          onClick={() => {
            onClose(false)
          }}
        >
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
  )
}
