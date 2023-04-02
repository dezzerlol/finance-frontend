import { axios } from '@/lib/axios'
import { removeCookie } from '@/lib/cookie'
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type UseAuth = [any, (v: any) => void]

const AuthContext = createContext<null | any>(null)

export function useAuth() {
  const context: UseAuth = useContext(AuthContext)

  if (!context) {
    throw new Error('No auth context')
  }

  return context
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const value = useMemo(() => [user, setUser], [user])

  useEffect(() => {
    async function getUser() {
      try {
        const res = await axios.get('/user/me')
        setUser(res.data)
      } catch (error) {
        removeCookie('REFRESH_TOKEN')
        removeCookie('ACCESS_TOKEN')
        navigate('/login', { replace: true })
      }
    }

    getUser()
  }, [])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
