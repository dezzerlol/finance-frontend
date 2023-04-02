import { Container } from '@mantine/core'
import React from 'react'
import Header from './Header'

const WalletLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container fluid m={0} p={0} h='100%' sx={{ display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Container fluid m={0} px='md' h='100%' mt='50px'>
        {children}
      </Container>
    </Container>
  )
}

export default WalletLayout
