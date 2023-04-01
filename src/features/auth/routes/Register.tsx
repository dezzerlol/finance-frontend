import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import AuthLayout from '../components/AuthLayout'
import { Button, Input, Text, Title } from '@mantine/core'
import { Link } from 'react-router-dom'
import ErrorText from '../components/ErrorText'
import { axios } from '@/lib/axios'
import { useState } from 'react'

const validationSchema = z
  .object({
    username: z
      .string()
      .min(8, { message: 'Логин должен быть не меньше 8 символов' })
      .max(255, { message: 'Логин должен быть не больше 255 символов' }),
    password: z
      .string()
      .min(3, { message: 'Пароль должен быть не меньше 3 символов' })
      .max(72, { message: 'Пароль должен быть не больше 72 символов' }),
    confirmPassword: z.string().min(1, { message: 'Введите пароль еще раз' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Пароли не совпадают',
  })

type ValidationSchema = z.infer<typeof validationSchema>

export const Register = () => {
  const [resMessage, setResMessage] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  })

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    const res = await axios.post('/auth/register', {
      username: data.username,
      password: data.password,
    })

    if (res.status === 201) {
      setResMessage('Вы успешно зарегистрировались')
    }
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
        <Button type='submit'>Войти</Button>
      </form>
      <span>
        Уже зарегистрированы? <Link to='/login'>Войти</Link>
      </span>
      {resMessage && <Text color='green'>{resMessage}</Text>}
    </AuthLayout>
  )
}
