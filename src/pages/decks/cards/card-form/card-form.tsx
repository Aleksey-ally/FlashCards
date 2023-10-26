import { useState } from 'react'

import s from './card-form.module.scss'

import { Edit } from '@/assets'
import { CreateCardForm, useCardFormScheme } from '@/components/schemes/use-card-form-scheme.ts'
import Button from '@/components/ui/button/button.tsx'
import { ControlledTextField } from '@/components/ui/controlled'
import { Select } from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'
import { FileUploader } from '@/pages/utils/file-uploader.tsx'

type CardFormProps = {
  buttonTitle: string
  onSubmit: (data: FormData) => void
  onClose: () => void
}

export const CardForm = ({ buttonTitle, onSubmit, onClose }: CardFormProps): JSX.Element => {
  const [coverQuestion, setCoverQuestion] = useState<File | null>(null)
  const [coverAnswer, setCoverAnswer] = useState<File | null>(null)
  const [errorQuestion, setErrorQuestion] = useState<null | string>()
  const [errorAnswer, setErrorAnswer] = useState<null | string>()

  const { control, handleSubmit } = useCardFormScheme({
    question: '',
    answer: '',
  })

  const imageUrlQuestion = coverQuestion && URL.createObjectURL(coverQuestion)
  const imageUrlAnswer = coverAnswer && URL.createObjectURL(coverAnswer)

  const buttonUploadTextQuestion = imageUrlQuestion ? 'Change Cover Image' : ' Add Cover Image'
  const buttonUploadTextAnswer = imageUrlAnswer ? 'Change Cover Image' : ' Add Cover Image'

  const onSubmitHandler = (data: CreateCardForm) => {
    const formData = new FormData()

    formData.append('question', data.question)
    formData.append('answer', data.answer)

    if (coverQuestion) {
      formData.append('questionImg', coverQuestion || '')
    }
    if (coverAnswer) {
      formData.append('answerImg', coverAnswer || '')
    }
    onSubmit(formData)
    onClose()
  }
  const onLoadCoverQuestion = (data: File) => {
    setCoverQuestion(data)
    setErrorQuestion(null)
  }
  const onLoadCoverAnswer = (data: File) => {
    setCoverAnswer(data)
    setErrorAnswer(null)
  }
  const onLoadCoverErrorQuestion = (error: string) => {
    setErrorQuestion(error)
  }
  const onLoadCoverErrorAnswer = (error: string) => {
    setErrorAnswer(error)
  }
  const [valueSelect, setValueSelect] = useState<string>('Text')

  const selectOptions = [
    { value: 'Text', label: 'Text' },
    { value: 'Picture', label: 'Picture' },
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

      <div>
        <ControlledTextField
          className={s.input}
          control={control}
          name="question"
          label="Question"
        />
        <ControlledTextField className={s.input} control={control} name="answer" label="Answer" />
      </div>

      {valueSelect === 'Picture' && (
        <div>
          <Typography variant={'subtitle2'} as="span">
            Image Question:
          </Typography>
          {errorQuestion && <div className={s.errorMessage}>{errorQuestion}</div>}
          {imageUrlQuestion && (
            <div className={s.imageBlock}>
              <img src={imageUrlQuestion} alt="Card cover question" />
            </div>
          )}
          <FileUploader
            className={s.fileUploader}
            onLoadCover={onLoadCoverQuestion}
            onLoadError={onLoadCoverErrorQuestion}
          >
            <Button type="button" fullWidth variant={'secondary'}>
              <Edit />
              <Typography variant={'h2'} as="span">
                {buttonUploadTextQuestion}
              </Typography>
            </Button>
          </FileUploader>
          <Typography variant={'subtitle2'} as="span">
            Image Answer:
          </Typography>
          {errorAnswer && <div className={s.errorMessage}>{errorAnswer}</div>}
          {imageUrlAnswer && (
            <div className={s.imageBlock}>
              <img src={imageUrlAnswer} alt="Card cover answer" />
            </div>
          )}
          <FileUploader
            className={s.fileUploader}
            onLoadCover={onLoadCoverAnswer}
            onLoadError={onLoadCoverErrorAnswer}
          >
            <Button type="button" fullWidth variant={'secondary'}>
              <Edit />
              <Typography variant={'h2'} as="span">
                {buttonUploadTextAnswer}
              </Typography>
            </Button>
          </FileUploader>
        </div>
      )}

      <div className={s.buttonsContainer}>
        <Button type="button" variant={'secondary'} onClick={onClose}>
          <Typography variant={'subtitle2'}>Cancel</Typography>
        </Button>
        <Button>
          <Typography variant={'subtitle2'}>{buttonTitle}</Typography>
        </Button>
      </div>
    </form>
  )
}
