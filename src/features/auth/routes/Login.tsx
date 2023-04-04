import ErrorText from '@/components/ErrorText'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Title } from '@mantine/core'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '../api/auth'
import AuthLayout from '../components/AuthLayout'
import { AuthSchema, authSchema } from '../utils/authSchema'

export const Login = () => {
  const { mutateAsync, isLoading, error: apiError } = useLogin()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
  })

  const onSubmit: SubmitHandler<AuthSchema> = async (data) => {
    mutateAsync({ username: data.username, password: data.password }).then(() => {
      navigate('/wallets', { replace: true })
    })
  }

  return (
    <AuthLayout>
      <Title>Вход</Title>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Input placeholder='Логин' type='text' {...register('username')} />
        {errors.username && <ErrorText>{errors.username.message}</ErrorText>}
        <Input placeholder='Пароль' type='password' {...register('password')} />
        {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
        <Button type='submit' loading={isLoading}>
          Войти
        </Button>
        {apiError && <ErrorText>{apiError?.response?.data?.message}</ErrorText>}
      </form>
      <span>
        Еще нет аккаунта? <Link to='/register'>Зарегистрируйтесь</Link>
      </span>
    </AuthLayout>
  )
}
