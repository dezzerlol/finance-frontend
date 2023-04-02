import { Login, Register } from '@/features/auth'
import { Transactions, Wallet, Wallets } from '@/features/wallet'
import { getCookie } from '@/lib/cookie'
import AuthProvider from '@/providers/AuthProvider'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

const PublicRoute = (props: any) => {
  const accessToken = getCookie('ACCESS_TOKEN')

  return accessToken ? <Navigate to='/wallets' replace /> : props.children
}

const PrivateRoutes = (props: any) => {
  const accessToken = getCookie('ACCESS_TOKEN')
  const refreshToken = getCookie('REFRESH_TOKEN')

  if (!accessToken && !refreshToken) {
    return <Navigate to='/login' replace />
  }

  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='*' element={<div>404 not found</div>} />
      <Route path='/' element={<Navigate replace to='/wallets' />} />

      <Route
        path='/login'
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path='/register'
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route path='/wallets' element={<PrivateRoutes />}>
        <Route index element={<Wallets />} />
        <Route path=':id' element={<Wallet />} />
        <Route path=':id/income' element={<Transactions type='INCOME' />} />
        <Route path=':id/expense' element={<Transactions type='EXPENSE' />} />
      </Route>
    </Routes>
  )
}
