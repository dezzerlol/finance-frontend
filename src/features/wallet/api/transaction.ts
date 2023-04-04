import { axios } from '@/lib/axios'
import { ApiError, OperationType, Transaction } from '@/types'
import { useMutation, useQuery, useQueryClient } from 'react-query'

type UpdateTransaction = {
  id: string
  title: string
  walletId: string
}

type CreateTransaction = {
  walletId: string
  operation_type: OperationType
  amount: number
  title: string
}

type DeleteTransaction = {
  id: string
  walletId: string
}

const getTransactions = async (type: OperationType, id: string | undefined, skip: number, take: number) => {
  const res = await axios.get(`/wallet/${type.toLowerCase()}s/${id}?skip=${skip}&take=${take}`)
  return res.data
}

const createTransaction = async ({ walletId, operation_type, amount, title }: CreateTransaction) => {
  const res = await axios.post('/wallet/createTransaction', { walletId, operation_type, amount, title })
  return res.data
}

const deleteTransaction = async ({ id, walletId }: DeleteTransaction) => {
  const res = await axios.post('/wallet/deleteTransaction', { id, walletId })
  return res.data
}

const updateTransaction = async ({ id, title, walletId }: UpdateTransaction) => {
  const res = await axios.post('/wallet/updateTransaction', { id, title, walletId })
  return res.data
}

export function useTransaction(type: OperationType, id: string | undefined, skip: number, take: number) {
  return useQuery<Transaction[]>(['get-transaction', { type, id }], () => getTransactions(type, id, skip, take), {
    enabled: !!id,
  })
}

export function useCreateTransaction() {
  const queryClient = useQueryClient()

  return useMutation<any, ApiError, CreateTransaction>(['create-transaction'], createTransaction, {
    onSuccess: (res) => {
      queryClient.invalidateQueries(['get-transaction'])
      queryClient.invalidateQueries(['get-wallet'])
    },
  })
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient()

  return useMutation<any, ApiError, UpdateTransaction>(['update-transaction'], updateTransaction, {
    onSuccess: (res) => {
      queryClient.invalidateQueries(['get-transaction'])
    },
  })
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient()

  return useMutation<any, ApiError, DeleteTransaction>(['delete-transaction'], deleteTransaction, {
    onSuccess: (res) => {
      queryClient.invalidateQueries(['get-transaction'])
    },
  })
}
