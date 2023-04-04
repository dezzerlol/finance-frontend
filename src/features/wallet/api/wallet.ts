import { axios } from '@/lib/axios'
import { ApiError, Wallet } from '@/types'
import { useMutation, useQuery, useQueryClient } from 'react-query'

type CreateWallet = {
  title: string
}

type DeleteWallet = {
  id: string
}

type UpdateWallet = {
  id: string
  title: string
}

const getSingleWallet = async (id: string) => {
  const res = await axios.get(`/wallet/${id}`)
  return res.data
}

const getWallets = async () => {
  const res = await axios.get('/wallet/getWallets')
  return res.data
}

const createWallet = async ({ title }: CreateWallet) => {
  const res = await axios.post('/wallet/createWallet', { title })
  return res.data
}

const updateWallet = async ({ id, title }: UpdateWallet) => {
  const res = await axios.post('/wallet/updateWallet', { walletId: id, title })
  return res.data
}

const deleteWallet = async ({ id }: DeleteWallet) => {
  const res = await axios.post('/wallet/deleteWallet', { walletId: id })
  return res.data
}

export function useSingleWallet(id: string) {
  return useQuery<Wallet>(['get-wallet', { id }], () => getSingleWallet(id))
}

export function useWallets() {
  return useQuery<Wallet[]>(['get-wallets'], getWallets)
}

export function useCreateWallet() {
  const queryClient = useQueryClient()

  return useMutation<any, ApiError, CreateWallet>(['create-wallet'], createWallet, {
    onSuccess: (res) => {
      queryClient.invalidateQueries(['get-wallets'])
    },
  })
}

export function useUpdateWallet() {
  const queryClient = useQueryClient()

  return useMutation<any, ApiError, UpdateWallet>(['update-wallet'], updateWallet, {
    onSuccess: (res) => {
      queryClient.invalidateQueries(['get-wallets'])
    },
  })
}

export function useDeleteWallet() {
  const queryClient = useQueryClient()

  return useMutation<any, ApiError, DeleteWallet>(['delete-wallet'], deleteWallet, {
    onSuccess: (res) => {
      queryClient.invalidateQueries(['get-wallets'])
    },
  })
}
