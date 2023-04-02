import { axios } from '@/lib/axios'
import { formatMoney } from '@/utils/formatMoney'
import { ActionIcon, Card, Group, Text } from '@mantine/core'
import { IoArrowDownCircleOutline, IoArrowUpCircleOutline, IoCreateOutline } from 'react-icons/io5'
import DeleteButton from './DeleteButton'

type Props = {
  transactionId: string
  title: string
  amount: number
  type: 'income' | 'expense'
  date: string
  changeable?: boolean
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('UTC', { year: 'numeric', month: 'numeric', day: 'numeric' })
}

const TransactionCard = ({ transactionId, title, amount, type, date, changeable = false }: Props) => {
  async function handleDelete() {
    await axios.post('/wallet/deleteTransaction', { id: transactionId })
  }

  return (
    <Card shadow='sm' bg='#E7F5FF' w='250px'>
      <Group position='apart'>
        <Group spacing='xs' align='center'>
          {type === 'income' ? <IoArrowDownCircleOutline size='20' /> : <IoArrowUpCircleOutline size='20' />}
          <Text size='lg' weight={600}>
            {title}
          </Text>
          {changeable && (
            <ActionIcon size='xs' variant='transparent'>
              <IoCreateOutline />
            </ActionIcon>
          )}
        </Group>
        {changeable && (
          <DeleteButton
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
