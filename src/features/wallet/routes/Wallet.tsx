import FourOFour from '@/components/FourOFour'
import { formatMoney } from '@/utils/formatMoney'
import { Box, Container, Group, Stack, Text, Title } from '@mantine/core'
import { useParams } from 'react-router-dom'
import { useTransaction } from '../api/transaction'
import { useSingleWallet } from '../api/wallet'
import TransactionList from '../components/TransactionList'
import WalletLayout from '../components/WalletLayout'

export const Wallet = () => {
  const params = useParams()
  const id = params.id as string
  const { data: wallet, isLoading } = useSingleWallet(id)

  // wait for wallet to load
  const { data: incomes, isLoading: incomesLoading } = useTransaction('INCOME', wallet?.id, 0, 5)
  const { data: expenses, isLoading: expensesLoading } = useTransaction('EXPENSE', wallet?.id, 0, 5)

  if (!wallet && !isLoading) {
    return (
      <WalletLayout>
        <FourOFour />
      </WalletLayout>
    )
  }

  return (
    <WalletLayout>
      <Container>
        <Stack>
          <Title weight={400}>Кошелек: {wallet?.title}</Title>
          {wallet && <Text>Текущий баланс: {formatMoney(wallet.balance)} ₽</Text>}
        </Stack>
        <Group position='apart' align='start'>
          <Box>
            <Title weight={400} mb='md'>
              Доходы
            </Title>
            <TransactionList transactions={incomes} type='income' />
          </Box>
          <Box>
            <Title weight={400} mb='md'>
              Расходы
            </Title>
            <TransactionList transactions={expenses} type='expense' />
          </Box>
        </Group>
      </Container>
    </WalletLayout>
  )
}
