import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../../../shared/models'
import { UserState } from '../../../types/states'

const initialState: UserState = {
  user: {} as IUser,
  isAuth: false,
  userLoading: false,
  userError: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userFetching(state) {
      state.userLoading = true
    },
    userFetchingSuccess(state, action: PayloadAction<IUser>) {
      state.user = action.payload
      state.isAuth = true
      state.userError = ''
      state.userLoading = false
    },
    userFetchingError(state, action: PayloadAction<string>) {
      state.userLoading = true
      state.userError = action.payload
    },
    userLogoutSuccess(state) {
      state.user = {} as IUser
      state.isAuth = false
    },
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload
      state.isAuth = true
      state.userError = ''
      state.userLoading = false
    }
  }
})

export const {
  userFetching,
  userFetchingSuccess,
  userFetchingError,
  setUser,
  userLogoutSuccess
} = userSlice.actions
export default userSlice.reducer
