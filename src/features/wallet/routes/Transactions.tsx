import { useApi } from '@/hooks/useApi'
import { OperationType } from '@/types'
import { formatMoney } from '@/utils/formatMoney'
import { Container, Group, Stack, Text, Title } from '@mantine/core'
import { useParams } from 'react-router-dom'
import NewTransactionButton from '../components/NewTransactionButton'
import TransactionCard from '../components/TransactionCard'
import WalletLayout from '../components/WalletLayout'

const typeTranslation = {
  INCOME: 'Доходы',
  EXPENSE: 'Расходы',
}

export const Transactions = ({ type }: { type: OperationType }) => {
  const { id } = useParams()

  const { data: wallet, loading: walletLoading } = useApi<any>({
    url: `/wallet/${id}`,
    method: 'GET',
  })

  const { data: transactions, loading: incomesLoading } = useApi<any[]>({
    url: `/wallet/${type.toLowerCase()}s/${id}?skip=${0}&take=${100}`,
    method: 'GET',
  })

  return (
    <WalletLayout>
      <Container>
        <Group position='apart' align='center'>
          <Title weight={400}>
            {typeTranslation[type]} кошелька: {wallet?.title}
          </Title>
          <NewTransactionButton walletId={id} type={type} />
        </Group>
        {wallet && <Text>Текущий баланс: {formatMoney(wallet.balance)} ₽</Text>}
        <Stack my='md' align='center'>
          {transactions?.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transactionId={transaction.id}
              amount={transaction.amount}
              date={transaction.createdAt}
              title={transaction.title}
              type={type.toLowerCase() as any}
              changeable={true}
            />
          ))}
        </Stack>
      </Container>
    </WalletLayout>
  )
}
