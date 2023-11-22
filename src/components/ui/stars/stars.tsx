import s from './stars.module.scss'

import { Star, StarOutline } from '@/assets'

type Props = {
  grade: number
}

export const Stars = ({ grade }: Props) => {
  const stars = Array.from({ length: grade }, (_, index) => <Star key={index} />)
  const starsOutline = Array.from({ length: 5 - grade }, (_, index) => <StarOutline key={index} />)
  const rating = [...stars, ...starsOutline]

  return <div className={s.rating}>{rating}</div>
}
