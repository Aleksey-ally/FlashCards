import { cssTransition } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.min.css'
import s from '@/pages/utils/toastify-options/toastify-options.module.scss'

import 'animate.css/animate.min.css'

export const infoOptions = {
  style: { background: 'var(--color-dark-700)' },
  progressStyle: { background: 'var(--color-info-700)' },
  className: s.infoIcon,
}

export const successOptions = {
  style: { background: 'var(--color-dark-700)' },
  progressStyle: { background: 'var(--color-success-700)' },
  className: s.successIcon,
}

export const errorOptions = {
  style: { background: 'var(--color-dark-700)' },
  progressStyle: { background: 'var(--color-danger-500)' },
  className: s.errorIcon,
}

export const bounce = cssTransition({
  enter: 'animate__animated animate__bounceIn',
  exit: 'animate__animated animate__bounceOut',
})
