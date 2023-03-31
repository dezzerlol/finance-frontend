import { useRoutes } from 'react-router-dom'

const publicRoutes = [
  { path: '/login', element: <div>Login page</div> },
  { path: '/signup', element: <div>Signup page</div> },
]

const protectedRoutes = [
  { path: '/wallets', element: <div>All wallets page</div> },
  { path: '/wallet/:id', element: <div>Single wallet page</div> },
  { path: '/wallet/:id/income', element: <div>Income page</div> },
  { path: '/wallet/:id/expense', element: <div>Expense page</div> },
]

export const AppRoutes = () => {
  const element = useRoutes([...publicRoutes, ...protectedRoutes])

  return <>{element}</>
}
