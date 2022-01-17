import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPlaylist } from '../../../../shared/models'
import { PlaylistState } from '../../../types/states'

const initialState: PlaylistState = {
  myPlaylists: [],
  followedPlaylistsIds: [],
  followedPlaylists: []
}

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setPlaylists(state, action: PayloadAction<IPlaylist[]>) {
      state.followedPlaylistsIds = action.payload.map((pl) => pl.id)
      state.followedPlaylists = action.payload
    },
    addPlaylist(state, action: PayloadAction<IPlaylist>) {
      state.myPlaylists.push(action.payload)
    },
    setMyPlaylists(state, action: PayloadAction<IPlaylist[]>) {
      state.myPlaylists = action.payload
    },
    addFollowedPlaylist(state, action: PayloadAction<IPlaylist>) {
      state.followedPlaylists.push(action.payload)
      state.followedPlaylistsIds.push(action.payload.id)
    },
    removeFollowedPlaylist(state, action: PayloadAction<number>) {
      state.followedPlaylists = state.followedPlaylists.filter(
        (pl) => pl.id != action.payload
      )
      state.followedPlaylistsIds = state.followedPlaylistsIds.filter(
        (id) => id != action.payload
      )
    },
    updatePlaylistImage(state, action: PayloadAction<IPlaylist>) {
      const idx = state.myPlaylists.findIndex(
        (pl) => pl.id == action.payload.id
      )
      state.myPlaylists[idx] = action.payload
    }
  }
})

export const {
  setPlaylists,
  addPlaylist,
  setMyPlaylists,
  addFollowedPlaylist,
  removeFollowedPlaylist,
  updatePlaylistImage
} = playlistSlice.actions
export default playlistSlice.reducer
