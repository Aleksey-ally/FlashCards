import { ReactNode, useState } from 'react'

import { Modal } from '@/components/ui/modal'
import { CardForm } from '@/pages/decks/cards/add-card-modale/card-form/card-form.tsx'

export type DeckProps = {
  trigger: ReactNode
  buttonTitle: string
  onSubmit: (data: FormData) => void
}

export const AddCardModal = ({ trigger, buttonTitle, onSubmit }: DeckProps): JSX.Element => {
  const [open, setOpen] = useState(false)

  const closeModal = () => {
    setOpen(false)
  }

  return (
    <Modal trigger={trigger} open={open} onClose={setOpen} title="Add New Card">
      <CardForm buttonTitle={buttonTitle} onSubmit={onSubmit} onClose={closeModal} />
    </Modal>
  )
}
