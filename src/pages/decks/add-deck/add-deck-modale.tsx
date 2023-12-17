import { ReactNode, useState } from 'react'

import { toast } from 'react-toastify'

import { Modal } from '@/components/ui/modal'
import { DeckForm } from '@/pages/decks'
import { errorOptions, successOptions } from '@/pages/utils/toastify-options/toastify-options.ts'
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
      updateDeck({ id: deckId, body: data })
        .unwrap()
        .then(() => {
          const nameDeck = data.get('name')

          toast.success(`Deck ${nameDeck} updated successfully`, successOptions)
          setOpen(false)
        })
        .catch(() => {
          toast.error(`Deck not found`, errorOptions)
        })
    }
    if (type === 'Add deck') {
      createDeck(data)
        .unwrap()
        .then(() => {
          const newNameDeck = data.get('name')

          toast.success(`Deck ${newNameDeck} created successfully`, successOptions)
        })
        .catch(() => {
          toast.error(`You are unauthorized`, errorOptions)
        })
      setOpen(false)
    }
  }

  const closeModal = () => {
    setOpen(false)
  }

  return (
    <Modal title={'Add New Deck'} trigger={trigger} open={open} onClose={() => setOpen(!open)}>
      <DeckForm
        values={values}
        onSubmit={handleDeckSubmit}
        onClose={closeModal}
        buttonTitle={buttonTitle}
      />
    </Modal>
  )
}
