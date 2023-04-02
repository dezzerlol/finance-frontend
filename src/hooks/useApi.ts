import { axios } from '@/lib/axios'
import { useEffect, useState } from 'react'

export const useApi = <T>({ url, method, body }: { url: string; method: 'POST' | 'GET'; body?: {} }) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<T | null>(null)

  const fetchApi = async () => {
    const res = await axios.request({ url, method: method, ...body })

    setLoading(false)
    setData(res.data)
  }

  useEffect(() => {
    fetchApi()
  }, [])

  return { loading, data }
}
