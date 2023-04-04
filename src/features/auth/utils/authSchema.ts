import { z } from 'zod'

export const authSchema = z.object({
  username: z
    .string()
    .min(8, { message: 'Логин должен быть не меньше 8 символов' })
    .max(255, { message: 'Логин должен быть не больше 255 символов' }),
  password: z
    .string()
    .min(3, { message: 'Пароль должен быть не меньше 3 символов' })
    .max(72, { message: 'Пароль должен быть не больше 72 символов' }),
})

export type AuthSchema = z.infer<typeof authSchema>

export const registerSchema = authSchema
  .extend({
    confirmPassword: z.string().min(1, { message: 'Введите пароль еще раз' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Пароли не совпадают',
  })

export type RegisterSchema = z.infer<typeof registerSchema>
