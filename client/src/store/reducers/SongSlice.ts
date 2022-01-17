import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISong } from '../../../../shared/models.d'
import { SongState } from '../../../types/states'

const initialState: SongState = {
  status: 'default',
  error: '',
  followedSongsIds: [],
  followedSongs: [],
  images: {
    liked: "../uploads/images/liked.png",
    recently: "../uploads/images/recently.png",
    popular: "../uploads/images/popular.jpg"
  }
}

export const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    setFollowedSongs(state, action: PayloadAction<ISong[]>) {
      state.followedSongsIds = action.payload.map((s) => s.id)
      state.followedSongs = action.payload
    },
    setSongError(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
    setSongStatus(state, action: PayloadAction<'success' | 'default'>) {
      state.status = action.payload
    },
    addFollowedSong(state, action: PayloadAction<ISong>) {
      state.followedSongs.push(action.payload)
      state.followedSongsIds.push(action.payload.id)
    },
    removeFollowedSong(state, action: PayloadAction<number>) {
      state.followedSongs = state.followedSongs.filter(
        (s) => s.id != action.payload
      )
      state.followedSongsIds = state.followedSongsIds.filter(
        (id) => id != action.payload
      )
    }
  }
})

export const {
  setSongError,
  setSongStatus,
  setFollowedSongs,
  addFollowedSong,
  removeFollowedSong,
} = songSlice.actions
export default songSlice.reducer
