import { NavLink } from 'react-router-dom'

import s from './title-block.module.scss'

import { Edit, MoreVertical, PlayArrow, Trash } from '@/assets'
import Button from '@/components/ui/button/button.tsx'
import { Dropdown } from '@/components/ui/dropdown'
import { DropdownItem } from '@/components/ui/dropdown/dropdownItem'
import { Typography } from '@/components/ui/typography'
import { AddCardModal } from '@/pages/cards/add-card-modale'
import { AddEditDeckModal } from '@/pages/decks'
import { DeleteDeckModal } from '@/pages/decks/delete-deck-modal'
import { User } from '@/services/auth/auth.types.ts'
import { Deck } from '@/services/decks'

type Props = {
  variant: 'default' | 'with dropdown'
  currentDeck?: Deck
  currentUser?: User
  deckID?: string
  open?: boolean
  onClose?: (open: boolean) => void
  onSubmit?: (data: FormData) => void
}

export const TitleBlock = ({
  variant = 'default',
  currentDeck,
  deckID,
  open,
  onClose,
  currentUser,
  onSubmit,
}: Props) => {
  return (
    <div className={s.titleBlock}>
      <Typography className={s.title} variant={'large'}>
        {currentDeck?.name}
        {variant === 'with dropdown' && (
          <Dropdown trigger={<MoreVertical />} align={'end'}>
            <DropdownItem>
              <NavLink to={`/card/${currentDeck?.id}`} className={s.playLearn}>
                <Typography variant="caption" className={s.captionItem}>
                  <PlayArrow />
                  Learn
                </Typography>
              </NavLink>
            </DropdownItem>

            <DropdownItem onSelect={e => e.preventDefault()} text={'Edit'}>
              <AddEditDeckModal
                trigger={
                  <Typography variant="caption" className={s.captionItem}>
                    <Edit />
                    Edit
                  </Typography>
                }
                buttonTitle="Save Changes"
                values={currentDeck}
                deckId={deckID}
                type={'Edit deck'}
              />
            </DropdownItem>
            <DropdownItem onSelect={e => e.preventDefault()}>
              <DeleteDeckModal
                open={open as boolean}
                onClose={onClose as (open: boolean) => void}
                trigger={
                  <Typography variant="caption" className={s.captionItem}>
                    <Trash />
                    Delete
                  </Typography>
                }
                deckName={currentDeck?.name}
                deckId={currentDeck?.id}
              />
            </DropdownItem>
          </Dropdown>
        )}
      </Typography>
      <div>
        {currentDeck?.userId === currentUser?.id ? (
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
            onSubmit={onSubmit as (data: FormData) => void}
          ></AddCardModal>
        ) : (
          <NavLink className={s.button} to={`/card/${currentDeck?.id}`}>
            <Button>Learn to Deck</Button>
          </NavLink>
        )}
      </div>
    </div>
  )
}
