import { useState } from 'react'

import { Navigate, useParams } from 'react-router-dom'

import s from './card.module.scss'

import Button from '@/components/ui/button/button'
import { Card } from '@/components/ui/card'
import { RadioGroup } from '@/components/ui/radio-group'
import { Typography } from '@/components/ui/typography'
import { useGetDeckQuery, useLearnDeckQuery, useSaveGradeMutation } from '@/services/decks'

export const CardPage = () => {
  const { deckID } = useParams()
  const id = deckID as string

  const { data: deck } = useGetDeckQuery({ id })
  const { data: card } = useLearnDeckQuery({ id })
  const [saveGrade] = useSaveGradeMutation()

  const classes = {
    question: `${s.textWrapper} ${s.question}`,
    attempts: `${s.textWrapper} ${s.attempts}`,
    answer: `${s.textWrapper} ${s.answer}`,
    rate: `${s.textWrapper} ${s.rate}`,
  }

  const [openAnswer, setOpenAnswer] = useState<boolean>(false)
  const [currentAnswer, setCurrentAnswer] = useState<string>('')

  const grade = [
    { title: 'Did not know', value: '1' },
    { title: 'Forgot', value: '2' },
    { title: 'A lot of thought', value: '3' },
    { title: 'Confused', value: '4' },
    { title: 'Knew the answer', value: '5' },
  ]

  const showAnswerHandler = () => {
    setOpenAnswer(true)
  }

  const nextQuestionHandler = (cId: string | undefined, grade: number) => {
    let cardId = cId as string

    saveGrade({ id, body: { cardId, grade } })
    setOpenAnswer(false)
  }

  const currentAnswerHandler = (value: string) => {
    setCurrentAnswer(value)
  }
  if (deck?.cardsCount === 0) return <Navigate to={`/cards/${deckID}`} />

  return (
    <Card className={s.card}>
      <Typography variant="large">Learn {deck?.name}</Typography>
      <div className={classes.question}>
        <Typography variant="subtitle1">Question:</Typography>

        <Typography variant="body1">
          {card?.questionImg && (
            <img className={s.image} src={card?.questionImg} alt="Question cover" />
          )}
          {card?.question}
        </Typography>
      </div>
      <div className={classes.attempts}>
        <Typography variant="body2">Количество попыток ответов на вопрос:</Typography>
        <Typography variant="subtitle2">{card?.shots}</Typography>
      </div>
      {openAnswer && (
        <>
          <div className={classes.answer}>
            <Typography variant="subtitle1">Answer:</Typography>

            <Typography variant="body1">
              {card?.answerImg && (
                <img className={s.image} src={card?.answerImg} alt="Answer cover" />
              )}
              {card?.answer}
            </Typography>
          </div>
          <div className={classes.rate}>
            <Typography variant="subtitle1">Rate yourself:</Typography>
            <RadioGroup options={grade} onValueChange={currentAnswerHandler}></RadioGroup>
          </div>
        </>
      )}
      <div className={s.buttonWrapper}>
        <Button
          fullWidth
          onClick={
            openAnswer
              ? () => nextQuestionHandler(card?.id, Number(currentAnswer))
              : showAnswerHandler
          }
        >
          <Typography variant="subtitle2">
            {openAnswer ? 'Next Question' : 'Show Answer'}
          </Typography>
        </Button>
      </div>
    </Card>
  )
}
