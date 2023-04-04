import { Button, Center, Stack, Text, Title } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import TransactionCard from './TransactionCard'
import { Transaction } from '@/types'

type Props = {
  transactions: Transaction[] | undefined
  type: 'income' | 'expense'
}

const TransactionList = ({ transactions, type }: Props) => {
  const navigate = useNavigate()

  return (
    <Stack>
      {transactions && transactions.length > 0 ? (
        transactions.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            transactionId={transaction.id}
            amount={transaction.amount}
            date={transaction.createdAt}
            title={transaction.title}
            type={type}
          />
        ))
      ) : (
        <Center w='250px'>
          <Text>0 операций...</Text>
        </Center>
      )}
      <Button onClick={() => navigate(`${type}`)}>Показать все</Button>
    </Stack>
  )
}

export default TransactionList
