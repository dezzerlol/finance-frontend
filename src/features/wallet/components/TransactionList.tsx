import { Button, Stack, Title } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import TransactionCard from './TransactionCard'

type Props = {
  title: string
  transactions: any[] | null
  type: 'income' | 'expense'
}

const TransactionList = ({ title, transactions, type }: Props) => {
  const navigate = useNavigate()

  return (
    <Stack>
      <Title weight={400}>{title}</Title>
      {transactions?.map((transaction) => (
        <TransactionCard
          key={transaction.id}
          transactionId={transaction.id}
          amount={transaction.amount}
          date={transaction.createdAt}
          title={transaction.title}
          type={type}
        />
      ))}
      <Button onClick={() => navigate(`${type}`)}>Показать все</Button>
    </Stack>
  )
}

export default TransactionList
