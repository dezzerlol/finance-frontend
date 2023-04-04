import { formatMoney } from '@/utils/formatMoney'
import { Card, Group, Text } from '@mantine/core'
import { IoArrowDownCircleOutline, IoArrowUpCircleOutline } from 'react-icons/io5'
import { useDeleteTransaction } from '../api/transaction'
import DeleteButton from './DeleteButton'
import UpdateTransactionButton from './UpdateTransactionButton'
import { useParams } from 'react-router-dom'
import { formatDate } from '@/utils/formatDate'

type Props = {
  transactionId: string
  title: string
  amount: number
  type: 'income' | 'expense'
  date: string
  changeable?: boolean
}

const TransactionCard = ({ transactionId, title, amount, type, date, changeable = false }: Props) => {
  const { mutateAsync, isLoading, error: apiError } = useDeleteTransaction()
  const params = useParams()
  const walletId = params.id as string

  async function handleDelete() {
    await mutateAsync({ id: transactionId, walletId })
  }

  return (
    <Card shadow='sm' bg='#E7F5FF' w='300px' h='90px'>
      <Group position='apart'>
        <Group spacing='xs' align='center'>
          {type === 'income' ? <IoArrowDownCircleOutline size='20' /> : <IoArrowUpCircleOutline size='20' />}
          <Text title={title} size='lg' weight={600} maw='150px' truncate='end'>
            {title}
          </Text>
          {changeable && <UpdateTransactionButton id={transactionId} title={title} />}
        </Group>
        {changeable && (
          <DeleteButton
            isLoading={isLoading}
            error={apiError?.response?.data?.message}
            modalTitle='Удалить операцию'
            modalDescription='Вы действительно хотите удалить операцию?'
            handleDelete={handleDelete}
          />
        )}
      </Group>
      <Group position='apart'>
        <Text weight={600} color={type === 'income' ? 'green' : 'red'} align='right'>
          {type === 'income' ? '+' : '-'}
          {formatMoney(amount)}₽
        </Text>
        <Text color='gray'>{formatDate(date)}</Text>
      </Group>
    </Card>
  )
}

export default TransactionCard
