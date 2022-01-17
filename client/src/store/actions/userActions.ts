import { IUser } from '../../../../shared/models'
import { AuthResponse } from '../../../types/auth'
import $api from '../../helpers/http'
import { errorToast } from '../../helpers/toasts'
import {
  setUser,
  userFetching,
  userFetchingError,
  userLogoutSuccess
} from '../reducers/UserSlice'
import { AppDispatch } from '../store'

export const userRegistration =
  (obj: { nickname: string; email: string; password: string }) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(userFetching())
      const { data } = await $api.post<AuthResponse>('/register', obj)
      localStorage.setItem('token', data.accessToken)
      dispatch(setUser(data.user))
    } catch (err: any) {
      dispatch(userFetchingError('Something went wrong'))
    }
  }


export const userLogin = (obj: { login: string; password: string }) => async (dispatch: AppDispatch) => {
    try {
      dispatch(userFetching())
      const { data } = await $api.post<AuthResponse>('/login', obj)
      localStorage.setItem('token', data.accessToken)
      dispatch(setUser(data.user))
    } catch (err: any) {
      dispatch(userFetchingError('Something went wrong'))
    }
  }


export const userLogout = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(userFetching())
    await $api.post('/logout')
    localStorage.clear()
    dispatch(userLogoutSuccess())
  } catch (err: any) {
    dispatch(userFetchingError('Something went wrong'))
  }
}


export const fetchUser = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(userFetching())
    const { data } = await $api.get<IUser>('/user')
    dispatch(setUser(data))
  } catch (err: any) {
    dispatch(userFetchingError('Something went wrong'))
  }
}


export const fetchUserById = async (id: number) => {
  try {
    const { data } = await $api.get<IUser>(`/user/${id}`)
    return data
  } catch (err: any) {
    errorToast('Something went wrong')
  }
}


export const getUsersByQuery = async (query: string) => {
  try {
    const { data } = await $api.get<IUser[]>(`/users/${query}`)
    return data
  } catch (err: any) {
    errorToast('Something went wrong')
  }
}


export const updateAvatar = (body: any) => async (dispatch: AppDispatch) => {
  try {
    dispatch(userFetching())
    const config = { headers: { 'Content-Type': 'multipart/form-data' } }
    const { data } = await $api.put<IUser>('/user/avatar', body, config)
    dispatch(setUser(data))
  } catch (err: any) {
    dispatch(userFetchingError('Something went wrong'))
  }
}
