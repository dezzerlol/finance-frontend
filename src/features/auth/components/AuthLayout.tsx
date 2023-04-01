import { Center, Container, Flex } from '@mantine/core'
import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container fluid sx={{ height: '100%' }}>
      <Center h='100%'>
        <Flex direction='column' gap='md' maw='460px' w='100%'>
          {children}
        </Flex>
      </Center>
    </Container>
  )
}

export default AuthLayout
