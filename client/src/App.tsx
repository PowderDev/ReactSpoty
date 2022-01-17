import './styles/App.scss'
import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import HomePage from './pages/MainPages/HomePage'
import PlaylistPage from './pages/SongCollections/PlaylistPage'
import Auth from './pages/FormPages/Auth'
import { fetchUser } from './store/actions/userActions'
import Profile from './pages/MainPages/Profile'
import CreateSong from './pages/FormPages/CreateSong'
import CreateAlbum from './pages/FormPages/CreateAlbum'
import AlbumPage from './pages/SongCollections/AlbumPage'
import SearchPage from './pages/MainPages/SearchPage'
import { getLikedSongs } from './store/actions/songAction'
import { getFollowedAlbums } from './store/actions/albumAction'
import Player from './components/Player'
import MusicLibrary from './pages/MainPages/MusicLibrary'
import {
  getUsersPlaylists,
  getFollowedPlaylists
} from './store/actions/playlistAction'
import { useAppSelector } from './helpers/hooks/redux'

function App() {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const { user } = useAppSelector(state => state.user)
  const nav = useNavigate()

  useEffect(() => {
    if (token) {
      dispatch(fetchUser())
    } else {
      nav("/login")
    }
    if (user.id && token) {
      dispatch(getLikedSongs())
      dispatch(getFollowedAlbums())
      dispatch(getUsersPlaylists())
      dispatch(getFollowedPlaylists())
    }
  }, [token])

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/playlist/:id' element={<PlaylistPage />} />
        <Route path='/album/:id' element={<AlbumPage />} />

        <Route path='/registration' element={<Auth />} />
        <Route path='/login' element={<Auth />} />

        <Route path='/profile/:id' element={<Profile />} />

        <Route path='/song/upload' element={<CreateSong />} />
        <Route path='/album/upload' element={<CreateAlbum />} />

        <Route path='/search' element={<SearchPage />} />
        <Route path='/library' element={<MusicLibrary />} />
      </Routes>
      <Player />
    </>
  )
}

export default App
