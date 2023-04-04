import { axios } from '@/lib/axios'
import { ApiError } from '@/types'
import { useMutation } from 'react-query'

interface AuthModel {
  username: string
  password: string
}

const login = async ({ username, password }: AuthModel) => {
  const res = await axios.post('/auth/login', { username, password })
  return res.data
}

const register = async ({ username, password }: AuthModel) => {
  const res = await axios.post('/auth/register', { username, password })
  return res.data
}

export function useLogin() {
  return useMutation<any, ApiError, AuthModel>(['login'], login)
}

export function useRegister() {
  return useMutation<any, ApiError, AuthModel>(['register'], register)
}
