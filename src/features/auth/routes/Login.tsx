import { axios } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Title } from '@mantine/core'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import AuthLayout from '../components/AuthLayout'
import ErrorText from '../components/ErrorText'

const validationSchema = z.object({
  username: z
    .string()
    .min(8, { message: 'Логин должен быть не меньше 8 символов' })
    .max(255, { message: 'Логин должен быть не больше 255 символов' }),
  password: z
    .string()
    .min(3, { message: 'Пароль должен быть не меньше 3 символов' })
    .max(72, { message: 'Пароль должен быть не больше 72 символов' }),
})

type ValidationSchema = z.infer<typeof validationSchema>

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  })

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    setIsLoading(true)

    try {
      await axios.post('/auth/login', { username: data.username, password: data.password })
      navigate('/wallets', { replace: true })
    } catch (error: any) {
      setApiError(error.response.data.message)
    } finally {
      setIsLoading(false)
    }
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
        {apiError && <ErrorText>{apiError}</ErrorText>}
      </form>
      <span>
        Еще нет аккаунта? <Link to='/register'>Зарегистрируйтесь</Link>
      </span>
    </AuthLayout>
  )
}
