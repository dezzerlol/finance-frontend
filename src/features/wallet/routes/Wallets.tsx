import { Container, Group, Title } from '@mantine/core'
import { useWallets } from '../api/wallet'
import NewWalletButton from '../components/NewWalletButton'
import WalletCard from '../components/WalletCard'
import WalletLayout from '../components/WalletLayout'

export const Wallets = () => {
  const { data: wallets, isLoading, error: apiError } = useWallets()

  return (
    <WalletLayout>
      <Container>
        <Group position='apart' my='md'>
          <Title weight={400}>Ваши кошельки</Title>
          <NewWalletButton />
        </Group>
        {wallets?.map((wallet) => (
          <WalletCard key={wallet.id} id={wallet.id} balance={wallet.balance} title={wallet.title} />
        ))}
      </Container>
    </WalletLayout>
  )
}
