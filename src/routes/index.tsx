import { Login, Register } from '@/features/auth'
import { Transactions, Wallet, Wallets } from '@/features/wallet'
import { useRoutes } from 'react-router-dom'

const publicRoutes = [
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
]

const protectedRoutes = [
  { path: '/wallets', element: <Wallets /> },
  { path: '/wallet/:id', element: <Wallet /> },
  { path: '/wallet/:id/income', element: <Transactions type='INCOME' /> },
  { path: '/wallet/:id/expense', element: <Transactions type='EXPENSE' /> },
]

export const AppRoutes = () => {
  const element = useRoutes([...publicRoutes, ...protectedRoutes])

  return <>{element}</>
}
