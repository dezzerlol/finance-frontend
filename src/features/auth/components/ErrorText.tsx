import { Text } from '@mantine/core'
import React from 'react'

const ErrorText = ({ children }: { children: React.ReactNode }) => {
  return <Text color='red'>{children}</Text>
}

export default ErrorText
