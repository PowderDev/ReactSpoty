import { toast } from 'react-toastify'
import { IAlbum } from '../../../../shared/models.d'
import $api from '../../helpers/http'
import { errorToast, toastConfig } from '../../helpers/toasts'
import { AppDispatch } from '../store'
import {
  addFollowedAlbum,
  removeFollowedAlbum,
  setAlbumStatus,
  setFollowedAlbums
} from '../reducers/AlbumSlice'

export const uploadAlbum = (body: any) => (dispatch: AppDispatch) => {
  const config = { headers: { 'Content-Type': 'multipart/form-data' } }

  toast
    .promise(
      $api.post('/album', body, config),
      {
        pending: 'Album is uploading',
        success: 'Album was uploaded',
        error: 'You already have an album with this title'
      },
      toastConfig
    )
    .then(() => {
      dispatch(setAlbumStatus('success'))
    })
}

export const getUsersAlbums = async (id: number) => {
  try {
    const { data } = await $api.get<IAlbum[]>(`/albums/${id}`)
    return data
  } catch (err: any) {
    console.log(err)
  }
}

export const getAlbumById = async (id: number) => {
  try {
    const { data } = await $api.get<IAlbum>(`/album/${id}`)
    return data
  } catch (err: any) {
    errorToast("Couldn't fetch this album")
  }
}

export const getPopularAlbums = async () => {
  try {
    const { data } = await $api.get<IAlbum[]>(`/albums/popular`)
    return data
  } catch (err: any) {
    console.log(err)
  }
}

export const getAlbumsByQuery = async (query: string) => {
  try {
    const { data } = await $api.get<IAlbum[]>(`/albums/search/${query}`)
    return data
  } catch (err: any) {
    errorToast('Something went wrong')
  }
}

export const getFollowedAlbums = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await $api.get<IAlbum[]>(`/followed/albums/`)
    dispatch(setFollowedAlbums(data))
  } catch (err: any) {
    console.log(err)
  }
}

export const followAlbum =
  (albumId: number) => async (dispatch: AppDispatch) => {
    try {
      const { data } = await $api.put<IAlbum>(`/follow/album/${albumId}`)
      dispatch(addFollowedAlbum(data))
    } catch (err: any) {
      errorToast('Something went wrong')
    }
  }

export const unfollowAlbum =
  (albumId: number) => async (dispatch: AppDispatch) => {
    try {
      await $api.put(`/unfollow/album/${albumId}`)
      dispatch(removeFollowedAlbum(albumId))
    } catch (err: any) {
      errorToast('Something went wrong')
    }
  }
