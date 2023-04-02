import { useApi } from '@/hooks/useApi'
import { Button, Container, Group, Title } from '@mantine/core'
import WalletCard from '../components/WalletCard'
import WalletLayout from '../components/WalletLayout'

export const Wallets = () => {
  const { data, loading } = useApi<any[]>({ url: '/wallet/getWallets', method: 'GET' })

  return (
    <WalletLayout>
      <Container>
        <Group position='apart' my='md'>
          <Title weight={400}>Ваши кошельки</Title>
          <Button>Добавить новый</Button>
        </Group>
        {data?.map((wallet) => (
          <WalletCard key={wallet.id} id={wallet.id} balance={wallet.balance} title={wallet.title} />
        ))}
      </Container>
    </WalletLayout>
  )
}
