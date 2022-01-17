import { IPlaylist } from '../../../../shared/models'
import $api from '../../helpers/http'
import { errorToast, successToast } from '../../helpers/toasts'
import {
  addFollowedPlaylist,
  addPlaylist,
  removeFollowedPlaylist,
  setMyPlaylists,
  setPlaylists,
  updatePlaylistImage
} from '../reducers/PlaylistSlice'
import { AppDispatch } from '../store'

export const getPopularPlaylists = async () => {
  try {
    const { data } = await $api.get<IPlaylist[]>(`/playlists/popular`)
    return data
  } catch (err: any) {
    console.log(err)
  }
}

export const getUsersPlaylists = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await $api.get<IPlaylist[]>(`/playlists/`)
    dispatch(setMyPlaylists(data))
  } catch (err: any) {
    console.log(err)
  }
}

export const getFollowedPlaylists = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await $api.get<IPlaylist[]>(`/followed/playlists`)
    dispatch(setPlaylists(data))
  } catch (err: any) {
    console.log(err)
  }
}

export const getPlaylistById = async (id: number) => {
  try {
    const { data } = await $api.get<IPlaylist>(`/playlist/${id}`)
    return data
  } catch (err: any) {
    errorToast("Couldn't fetch this Playlist")
  }
}

export const addSongToPlaylist = async (playlistId: number, songId: number) => {
  try {
    await $api.put(`/playlist/${playlistId}/add/${songId}`)
    successToast('Song added to playlist')
  } catch (err: any) {
    errorToast('Song already in the playlist')
  }
}

export const removeSongFromPlaylist = async (
  playlistId: number,
  songId: number
) => {
  try {
    await $api.put(`/playlist/${playlistId}/remove/${songId}`)
    successToast('Song removed from playlist')
  } catch (err: any) {
    errorToast('Something went wrong')
  }
}

export const createPlaylist =
  (title: string, authorId: number) => async (dispatch: AppDispatch) => {
    try {
      const { data } = await $api.post<IPlaylist>(`/playlist`, {
        title,
        authorId
      })
      dispatch(addPlaylist(data))
    } catch (err: any) {
      errorToast('Something went wrong')
    }
  }

export const getPlaylistsByQuery = async (query: string) => {
  try {
    const { data } = await $api.get<IPlaylist[]>(`/playlists/search/${query}`)
    return data
  } catch (err: any) {
    errorToast('Something went wrong')
  }
}

export const followPlaylist =
  (playlistId: number) => async (dispatch: AppDispatch) => {
    try {
      const { data } = await $api.put<IPlaylist>(
        `/follow/playlist/${playlistId}`
      )
      dispatch(addFollowedPlaylist(data))
    } catch (err: any) {
      errorToast('Something went wrong')
    }
  }

export const unfollowPlaylist =
  (playlistId: number) => async (dispatch: AppDispatch) => {
    try {
      await $api.put(`/unfollow/playlist/${playlistId}`)
      dispatch(removeFollowedPlaylist(playlistId))
    } catch (err: any) {
      errorToast('Something went wrong')
    }
  }

export const updateImage =
  (fData: FormData, playlistId: number) => async (dispatch: AppDispatch) => {
    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      const { data } = await $api.put<IPlaylist>(
        `/playlist/update/${playlistId}`,
        fData,
        config
      )
      dispatch(updatePlaylistImage(data))
    } catch (err: any) {
      errorToast('Something went wrong')
    }
  }
