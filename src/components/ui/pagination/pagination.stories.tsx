import { useState } from 'react'

import type { Meta } from '@storybook/react'

import { Pagination } from './index.ts'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>

export default meta

const PaginationWithPerPage = () => {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const TOTAL_PAGES_COUNT = 100

  return (
    <Pagination
      count={TOTAL_PAGES_COUNT}
      page={page}
      onChange={setPage}
      perPage={perPage}
      onPerPageChange={value => setPerPage(Number(value))}
      perPageOptions={[10, 20, 30, 100]}
    />
  )
}

export const Default = {
  render: () => <PaginationWithPerPage />,
}
