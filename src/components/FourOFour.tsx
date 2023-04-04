import { Stack, Text, Title } from '@mantine/core'
import { Link } from 'react-router-dom'

const FourOFour = () => {
  return (
    <Stack h='100%' align='center' justify='center'>
      <Title>404</Title>
      <Text>Страница не найдена</Text>
      <Link to='/'>Вернуться на главную</Link>
    </Stack>
  )
}

export default FourOFour
