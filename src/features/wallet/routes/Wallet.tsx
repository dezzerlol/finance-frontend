import { useApi } from '@/hooks/useApi'
import { formatMoney } from '@/utils/formatMoney'
import { Container, Group, Stack, Text, Title } from '@mantine/core'
import { useParams } from 'react-router-dom'
import TransactionList from '../components/TransactionList'
import WalletLayout from '../components/WalletLayout'

export const Wallet = () => {
  const { id } = useParams()
  const { data: wallet, loading: walletLoading } = useApi<any>({
    url: `/wallet/${id}`,
    method: 'GET',
  })

  const { data: incomes, loading: incomesLoading } = useApi<any[]>({
    url: `/wallet/incomes/${id}?skip=${0}&take=${5}`,
    method: 'GET',
  })
  const { data: expenses, loading: expensesLoading } = useApi<any[]>({
    url: `/wallet/expenses/${id}?skip=${0}&take=${5}`,
    method: 'GET',
  })

  return (
    <WalletLayout>
      <Container>
        <Stack>
          <Title weight={400}>Кошелек: {wallet?.title}</Title>
          {wallet && <Text>Текущий баланс: {formatMoney(wallet.balance)} ₽</Text>}
        </Stack>
        <Group position='apart' my='md'>
          <TransactionList transactions={incomes} title='Доходы' type='income' />
          <TransactionList transactions={expenses} title='Расходы' type='expense' />
        </Group>
      </Container>
    </WalletLayout>
  )
}
