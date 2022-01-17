import axios, { AxiosRequestConfig } from 'axios'
import { AuthResponse } from '../../../types/auth'
import { SERVER_URI } from '../../config'

const $api = axios.create({
  withCredentials: true,
  baseURL: SERVER_URI
})

$api.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config
    if (
      error.response?.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      try {
        originalRequest._isRetry = true
        const res = await axios.get<AuthResponse>(`${SERVER_URI}/refresh`, {
          withCredentials: true
        })
        localStorage.setItem('token', res.data.accessToken)
        return $api.request(originalRequest)
      } catch (err) {
        console.log(err)
      }
    }
    throw error
  }
)

export default $api
