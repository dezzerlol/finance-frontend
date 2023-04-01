import { Login, Register } from '@/features/auth'
import { Transactions, Wallet, Wallets } from '@/features/wallet'
import { axios } from '@/lib/axios'
import { getCookie, removeCookie } from '@/lib/cookie'
import { useEffect, useState } from 'react'
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'

const PublicRoute = (props: any) => {
  const isAuth = getCookie('ACCESS_TOKEN')

  return isAuth ? <Navigate to='/wallets' replace /> : props.children
}

const PrivateRoutes = (props: any) => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const accessToken = getCookie('ACCESS_TOKEN')
  const refreshToken = getCookie('REFRESH_TOKEN')

  if (!accessToken && !refreshToken) {
    return <Navigate to='/login' replace />
  }

  useEffect(() => {
    async function getUser() {
      try {
        const res = await axios.post('/user/me')
        setUser(res.data)
      } catch (error) {
        removeCookie('REFRESH_TOKEN')
        removeCookie('ACCESS_TOKEN')
        navigate('/login', { replace: true })
      }
    }

    getUser()
  }, [])

  return <Outlet />
}

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='*' element={<div>404 not found</div>} />

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
