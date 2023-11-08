import { ReactNode, useState } from 'react'

import { Modal } from '@/components/ui/modal'
import { DeckForm } from '@/pages/decks'
import { useCreateDeckMutation, useUpdateDeckMutation } from '@/services/decks'

export type DeckProps = {
  trigger: ReactNode
  values?: {
    name: string
    isPrivate?: boolean
    cover?: string | null
  }
  buttonTitle: string
  type: 'Edit deck' | 'Add deck'
  deckId?: string
}
export const AddEditDeckModal = ({
  trigger,
  values,
  type,
  deckId,
  buttonTitle,
}: DeckProps): JSX.Element => {
  const [updateDeck] = useUpdateDeckMutation()
  const [createDeck] = useCreateDeckMutation()
  const [open, setOpen] = useState<boolean>(false)
  const handleDeckSubmit = (data: FormData) => {
    if (type === 'Edit deck') {
      updateDeck({ id: deckId, body: data }).then(() => {
        setOpen(false)
      })
    }
    if (type === 'Add deck') {
      createDeck(data)
      setOpen(false)
    }
  }

  const closeModal = () => {
    setOpen(false)
  }

  return (
    <Modal title={'add edit deck'} trigger={trigger} open={open} onClose={() => setOpen(!open)}>
      <DeckForm
        values={values}
        onSubmit={handleDeckSubmit}
        onClose={closeModal}
        buttonTitle={buttonTitle}
      />
    </Modal>
  )
}
