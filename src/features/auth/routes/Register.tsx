import ErrorText from '@/components/ErrorText'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Text, Title } from '@mantine/core'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useRegister } from '../api/auth'
import AuthLayout from '../components/AuthLayout'
import { RegisterSchema, registerSchema } from '../utils/authSchema'

export const Register = () => {
  const [resMessage, setResMessage] = useState('')
  const { mutateAsync, isLoading, error: apiError } = useRegister()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
    setResMessage('')
    await mutateAsync({ username: data.username, password: data.password })

    setResMessage('Вы успешно зарегистрировались')
  }

  return (
    <AuthLayout>
      <Title>Регистрация</Title>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Input placeholder='Логин' type='text' {...register('username')} />
        {errors.username && <ErrorText>{errors.username.message}</ErrorText>}
        <Input placeholder='Пароль' type='password' {...register('password')} />
        {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
        <Input placeholder='Подтверждение пароля' type='password' {...register('confirmPassword')} />
        {errors.confirmPassword && <ErrorText>{errors.confirmPassword.message}</ErrorText>}
        <Button type='submit' loading={isLoading}>
          Отправить
        </Button>
      </form>
      <span>
        Уже зарегистрированы? <Link to='/login'>Войти</Link>
      </span>
      {apiError && <ErrorText>{apiError?.response?.data?.message}</ErrorText>}
      {resMessage && <Text color='green'>{resMessage}</Text>}
    </AuthLayout>
  )
}
