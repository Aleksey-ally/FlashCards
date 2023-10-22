import { useState } from 'react'

import s from './card-form.module.scss'

import { Edit } from '@/assets'
import { CardFormValues, useCardForm } from '@/components/schemes/use-card-form.tsx'
import { DeckFormValues, useDeckForm } from '@/components/schemes/use-deck-form.tsx'
import { Button } from '@/components/ui/button'
import { ControlledCheckbox, ControlledTextField } from '@/components/ui/controlled'
import { Select } from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'
import { FileUploader } from '@/pages/decks/add-deck/deck-form/file-uploader.tsx'

type CardFormProps = {
  buttonTitle: string
  onSubmit: (data: FormData) => void
  onClose: () => void
}

export const CardForm = ({ buttonTitle, onSubmit, onClose }: CardFormProps): JSX.Element => {
  const [cover, setCover] = useState<File | null>(null)
  const [error, setError] = useState<null | string>()

  const { control, handleSubmit } = useCardForm({
    question: '',
    answer: '',
  })

  // const imageUrl = cover && URL.createObjectURL(cover)

  // const buttonUploadText = imageUrl ? 'Change Cover Image' : ' Add Cover Image'

  const onSubmitHandler = (data: CardFormValues) => {
    const formData = new FormData()

    formData.append('question', data.question)
    formData.append('answer', data.answer)

    if (cover) {
      formData.append('cover', cover || '')
    }
    onSubmit(formData)
    onClose()
  }
  // const onLoadCover = (data: File) => {
  //   setCover(data)
  //   setError(null)
  // }
  // const onLoadCoverError = (error: string) => {
  //   setError(error)
  // }
  const [valueSelect, setValueSelect] = useState<number | string>('Text')

  const selectOptions = [
    { value: 'Text', label: 'Text' },
    { value: 'Picture', label: 'Picture', disabled: true },
  ]

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmitHandler)}>
      <Select
        value={valueSelect}
        onValueChange={setValueSelect}
        items={selectOptions}
        label={'Choose a question format'}
        className={s.select}
      ></Select>

      {error && <div className={s.errorMessage}>{error}</div>}
      {/*{imageUrl && (*/}
      {/*  <div className={s.imageBlock}>*/}
      {/*    <img src={imageUrl} alt="Pack cover" />*/}
      {/*  </div>*/}
      {/*)}*/}
      {/*<FileUploader*/}
      {/*  className={s.fileUploader}*/}
      {/*  onLoadCover={onLoadCover}*/}
      {/*  onLoadError={onLoadCoverError}*/}
      {/*>*/}
      {/*  <Button type="button" variant={'secondary'}>*/}
      {/*    <Edit />*/}
      {/*    <Typography variant={'h2'} as="span">*/}
      {/*      {buttonUploadText}*/}
      {/*    </Typography>*/}
      {/*  </Button>*/}
      {/*</FileUploader>*/}
      <ControlledTextField className={s.input} control={control} name="question" label="Question" />
      <ControlledTextField className={s.input} control={control} name="answer" label="Answer" />
      <div className={s.buttonsContainer}>
        <Button type="button" variant={'secondary'} onClick={onClose}>
          <Typography variant={'h2'}>Cancel</Typography>
        </Button>
        <Button>
          <Typography variant={'h2'}>{buttonTitle}</Typography>
        </Button>
      </div>
    </form>
  )
}
