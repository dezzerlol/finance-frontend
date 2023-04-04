import { AxiosError } from 'axios'

export type OperationType = 'INCOME' | 'EXPENSE'

export type Wallet = {
  balance: number
  createdAt: string
  id: string
  title: string
  updatedAt: string
  userId: string
}

export type Transaction = {
  amount: number
  createdAt: string
  id: string
  operation_type: OperationType
  title: string
  updatedAt: string
  walletId: string
}

interface Error {
  message: string
}

export type ApiError = AxiosError<Error>
