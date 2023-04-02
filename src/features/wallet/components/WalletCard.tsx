import { Card, Flex, Group, Text } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import UpdateWalletButton from './UpdateWalletButton'
import DeleteButton from './DeleteButton'
import { axios } from '@/lib/axios'

function formatCardId(cardId: string) {
  return '**** ' + cardId.slice(-4, cardId.length)
}

const WalletCard = ({ id, title, balance }: { id: string; title: string; balance: number }) => {
  const navigate = useNavigate()

  async function handleDelete() {
    await axios.post('/wallet/deleteWallet', { walletId: id })
  }

  return (
    <Card shadow='xs' mb='md' bg='#E6FCF5' c='gray'>
      <Group position='apart' align='center'>
        <Flex align='center' gap='md'>
          <Text weight={600} size='xl' onClick={() => navigate(`/wallets/${id}`)} sx={{ cursor: 'pointer' }}>
            {title}
          </Text>
          <UpdateWalletButton id={id} title={title} />
        </Flex>
        <DeleteButton
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
