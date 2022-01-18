import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISong } from '../../../../shared/models.d'
import { PlayerState } from '../../../types/states.d'

const initialState: PlayerState = {
  currentSong: {} as ISong,
  currentSongIdx: null,
  paused: true,
  currentTime: 0,
  volume: 0.15,
  songsList: [],
  playlistId: undefined
}

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentSong(state, action: PayloadAction<ISong>) {
      if (action.payload) {
        localStorage.setItem('currentSong', JSON.stringify(action.payload))
      }
      if (state.songsList) {
        state.currentSongIdx = state.songsList.findIndex(
          (s) => s.id == action.payload.id
        )
      }
      state.currentSong = action.payload
      state.paused = false
    },
    setCurrentTime(state, action: PayloadAction<number>) {
      localStorage.setItem('currentTime', String(action.payload))
      state.currentTime = action.payload
    },
    setVolume(state, action: PayloadAction<number>) {
      localStorage.setItem('volume', String(action.payload))
      state.volume = action.payload
    },
    setPaused(state, action: PayloadAction<boolean>) {
      state.paused = action.payload
    },
    setSongsList(
      state,
      action: PayloadAction<{ songs: ISong[]; playlistId?: number }>
    ) {
      if (action.payload.playlistId) {
        state.playlistId = action.payload.playlistId
      }
      state.songsList = action.payload.songs
    },
    setCurrentSongIdx(state, action: PayloadAction<number>) {
      state.currentSongIdx = action.payload
    }
  }
})

export const {
  setCurrentSong,
  setCurrentTime,
  setVolume,
  setPaused,
  setSongsList,
  setCurrentSongIdx
} = playerSlice.actions
export default playerSlice.reducer
