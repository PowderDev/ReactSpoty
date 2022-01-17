import { toast } from 'react-toastify'
import { ISong } from '../../../../shared/models.d'
import $api from '../../helpers/http'
import { AppDispatch } from '../store'
import { errorToast, toastConfig } from '../../helpers/toasts'
import {
  addFollowedSong,
  removeFollowedSong,
  setFollowedSongs,
  setSongStatus
} from '../reducers/SongSlice'

export const uploadSong = (body: any) => (dispatch: AppDispatch) => {
  const config = { headers: { 'Content-Type': 'multipart/form-data' } }
  toast
    .promise(
      $api.post('/song', body, config),
      {
        pending: 'Song is uploading',
        success: 'Song was uploaded',
        error: 'You already have a song with this title'
      },
      toastConfig
    )
    .then(() => {
      dispatch(setSongStatus('success'))
    })
}


export const getUsersSongs = async (id: number) => {
  try {
    const { data } = await $api.get<ISong[]>(`/songs/${id}`)
    return data
  } catch (err: any) {
    errorToast('Something went wrong')
  }
}


export const getLikedSongs = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await $api.get<ISong[]>(`/followed/songs`)
    dispatch(setFollowedSongs(data))
  } catch (err: any) {
    errorToast('Something went wrong')
  }
}


export const getSongsByQuery = async (query: string) => {
  try {
    const { data } = await $api.get<ISong[]>(`/songs/search/${query}`)
    return data
  } catch (err: any) {
    errorToast('Something went wrong')
  }
}


export const followSong = (songId: number) => async (dispatch: AppDispatch) => {
  try {
    const { data } = await $api.put<ISong>(`/follow/song/${songId}`)
    dispatch(addFollowedSong(data))
  } catch (err: any) {
    errorToast('Something went wrong')
  }
}


export const unfollowSong =
  (songId: number) => async (dispatch: AppDispatch) => {
    try {
      await $api.put(`/unfollow/song/${songId}`)
      dispatch(removeFollowedSong(songId))
    } catch (err: any) {
      errorToast('Something went wrong')
    }
  }


export const addListener = async (songId: number, playlistId?: number) => {
  try {
    await $api.put<ISong>(`/song/listeners`, { songId, playlistId })
  } catch (err: any) {
    console.log(err)
    // errorToast("Something went wrong")
  }
}


export const getMostPopularSongs = async () => {
  try {
    const { data } = await $api.get<ISong[]>(`/songs/popular`)
    return data
  } catch (err: any) {
    errorToast('Something went wrong')
  }
}


export const getRecentlyListened = async () => {
  try {
    const { data } = await $api.get<ISong[]>(`/songs/recently`)
    return data
  } catch (err: any) {
    errorToast('Something went wrong')
  }
}
