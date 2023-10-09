import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/table'

const data = [
  {
    title: 'Project A',
    cardsCount: 10,
    updated: '2023-07-07',
    createdBy: 'John Doe',
  },
  {
    title: 'Project B',
    cardsCount: 5,
    updated: '2023-07-06',
    createdBy: 'Jane Smith',
  },
  {
    title: 'Project C',
    cardsCount: 8,
    updated: '2023-07-05',
    createdBy: 'Alice Johnson',
  },
  {
    title: 'Project D',
    cardsCount: 3,
    updated: '2023-07-07',
    createdBy: 'Bob Anderson',
  },
  {
    title: 'Project E',
    cardsCount: 12,
    updated: '2023-07-04',
    createdBy: 'Emma Davis',
  },
]

export const Decks = () => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Cards</TableHeadCell>
          <TableHeadCell> Last Updated</TableHeadCell>
          <TableHeadCell> Created by</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(i => (
          <TableRow key={i.title}>
            <TableCell>{i.title}</TableCell>
            <TableCell>{i.cardsCount}</TableCell>
            <TableCell>{i.updated}</TableCell>
            <TableCell>{i.createdBy}</TableCell>
            <TableCell>icons...</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
