import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/table'
import { useGetDecksQuery } from '@/services/base-api.ts'

export const Decks = () => {
  const { data } = useGetDecksQuery()

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
        {data?.items?.map(deck => (
          <TableRow key={deck.id}>
            <TableCell>{deck.name}</TableCell>
            <TableCell>{deck.cardsCount}</TableCell>
            <TableCell>{new Date(deck.updated).toLocaleDateString()}</TableCell>
            <TableCell>{deck.author.name}</TableCell>
            <TableCell>icons...</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
