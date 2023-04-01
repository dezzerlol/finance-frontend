import Axios from 'axios'

const API_URL = 'http://localhost:5000'

export const axios = Axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

const refreshToken = () => {
  return axios.post('/auth/refresh')
}

axios.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    const originalReq = error.config

    if (error.response.status === 401 && !originalReq._retry) {
      originalReq._retry = true

      await refreshToken()

      return axios(originalReq)
    }

    return Promise.reject(error)
  }
)
