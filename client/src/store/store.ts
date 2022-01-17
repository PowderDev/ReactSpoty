import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/UserSlice'
import songReducer from './reducers/SongSlice'
import albumReducer from './reducers/AlbumSlice'
import playlistReducer from './reducers/PlaylistSlice'
import playerReducer from './reducers/PlayerSlice'

const rootReducer = combineReducers({
  user: userReducer,
  song: songReducer,
  album: albumReducer,
  playlist: playlistReducer,
  player: playerReducer
})

export const setupStore = () =>
  configureStore({
    reducer: rootReducer
  })

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
