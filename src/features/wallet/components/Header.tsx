import { axios } from '@/lib/axios'
import { useAuth } from '@/providers/AuthProvider'
import { Button, Flex, Menu } from '@mantine/core'
import { IoLogOutOutline, IoPersonCircleOutline } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const [user] = useAuth()

  const handleLogout = async () => {
    await axios.post('/auth/logout')
    navigate('/login')
  }

  return (
    <Flex
      justify='space-between'
      align='center'
      px='md'
      h='50px'
      w='100%'
      pos='fixed'
      bg='white'
      sx={{ borderBottom: '1px solid lightgray', zIndex: 1000 }}>
      <Link to='/wallets'>Мои кошельки</Link>
      <Menu width='target'>
        <Menu.Target>
          <Button variant='subtle' leftIcon={<IoPersonCircleOutline />}>
            {user?.username}
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item onClick={handleLogout} icon={<IoLogOutOutline />}>
            Выход
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Flex>
  )
}

export default Header
