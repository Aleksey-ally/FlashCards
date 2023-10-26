import { ReactNode, useState } from 'react'

import { Modal } from '@/components/ui/modal'
import { CardForm } from '@/pages/decks/cards/card-form/card-form.tsx'

export type DeckProps = {
  title: string
  trigger: ReactNode
  buttonTitle: string
  onSubmit: (data: FormData, id?: string) => void
}

export const EditCardModal = ({
  title,
  trigger,
  buttonTitle,
  onSubmit,
}: DeckProps): JSX.Element => {
  const [open, setOpen] = useState(false)

  const closeModal = () => {
    setOpen(false)
  }

  return (
    <Modal trigger={trigger} open={open} onClose={setOpen} title={title}>
      <CardForm buttonTitle={buttonTitle} onSubmit={onSubmit} onClose={closeModal} />
    </Modal>
  )
}
