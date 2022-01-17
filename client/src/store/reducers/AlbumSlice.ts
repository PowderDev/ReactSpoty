import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAlbum } from '../../../../shared/models'
import { AlbumState } from '../../../types/states'

const initialState: AlbumState = {
  status: 'default',
  error: '',
  followedAlbums: [],
  followedAlbumsIds: []
}

export const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    setAlbumError(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
    setAlbumStatus(state, action: PayloadAction<'success' | 'default'>) {
      state.status = action.payload
    },
    setFollowedAlbums(state, action: PayloadAction<IAlbum[]>) {
      state.followedAlbums = action.payload
      state.followedAlbumsIds = action.payload.map((a) => a.id)
    },
    addFollowedAlbum(state, action: PayloadAction<IAlbum>) {
      state.followedAlbums.push(action.payload)
      state.followedAlbumsIds.push(action.payload.id)
    },
    removeFollowedAlbum(state, action: PayloadAction<number>) {
      state.followedAlbums = state.followedAlbums.filter(
        (pl) => pl.id != action.payload
      )
      state.followedAlbumsIds = state.followedAlbumsIds.filter(
        (id) => id != action.payload
      )
    }
  }
})

export const {
  setAlbumError,
  setAlbumStatus,
  addFollowedAlbum,
  removeFollowedAlbum,
  setFollowedAlbums
} = albumSlice.actions
export default albumSlice.reducer
