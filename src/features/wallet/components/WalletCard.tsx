import { Card, Flex, Group, Text } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { useDeleteWallet } from '../api/wallet'
import DeleteButton from './DeleteButton'
import UpdateWalletButton from './UpdateWalletButton'

function formatCardId(cardId: string) {
  return '**** ' + cardId.slice(-4, cardId.length)
}

const WalletCard = ({ id, title, balance }: { id: string; title: string; balance: number }) => {
  const navigate = useNavigate()
  const { mutateAsync, isLoading, error: apiError } = useDeleteWallet()

  async function handleDelete() {
    await mutateAsync({ id })
  }

  return (
    <Card shadow='xs' mb='md' bg='#E6FCF5' c='gray'>
      <Group position='apart' align='center'>
        <Flex align='center' gap='md'>
          <Text
            title={title}
            maw='250px'
            truncate='end'
            weight={600}
            size='xl'
            onClick={() => navigate(`/wallets/${id}`)}
            sx={{ cursor: 'pointer' }}>
            {title}
          </Text>
          <UpdateWalletButton id={id} title={title} />
        </Flex>
        <DeleteButton
          isLoading={isLoading}
          error={apiError?.response?.data?.message}
          modalTitle='Удаление кошелька'
          modalDescription='Вы действительно хотите удалить кошелек?'
          handleDelete={handleDelete}
        />
      </Group>

      <Group position='apart'>
        <Text color='lightgray'>{formatCardId(id)}</Text>
        <Flex direction='column' align='flex-end'>
          <Text>Баланс</Text>
          <Text>{balance} ₽</Text>
        </Flex>
      </Group>
    </Card>
  )
}

export default WalletCard
