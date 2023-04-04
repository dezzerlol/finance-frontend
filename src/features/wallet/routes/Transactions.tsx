import { OperationType } from '@/types'
import { formatMoney } from '@/utils/formatMoney'
import { Container, Group, Stack, Text, Title } from '@mantine/core'
import { useParams } from 'react-router-dom'
import { useTransaction } from '../api/transaction'
import { useSingleWallet } from '../api/wallet'
import NewTransactionButton from '../components/NewTransactionButton'
import TransactionCard from '../components/TransactionCard'
import WalletLayout from '../components/WalletLayout'

const typeTranslation = {
  INCOME: 'Доходы',
  EXPENSE: 'Расходы',
}

export const Transactions = ({ type }: { type: OperationType }) => {
  const params = useParams()
  const id = params.id as string

  const { data: transactions } = useTransaction(type, id, 0, 100)

  const { data: wallet } = useSingleWallet(id)

  return (
    <WalletLayout>
      <Container>
        <Group position='apart' align='center'>
          <Title weight={400}>
            Кошелек {wallet?.title}: {typeTranslation[type]}
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
