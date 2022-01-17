import { ISong, IAlbum } from './../../shared/models.d';
import { IPlaylist, IUser } from "../../shared/models";

export type UserState = {
    user: IUser;
    isAuth: boolean;
    userLoading: boolean;
    userError: string;
    foundUsers?: IUser[];
}


export interface SongState {
    status: "success" | "default"
    error: string,
    followedSongsIds: number[];
    followedSongs: ISong[];
    images: {liked: string, recently: string, popular: string}
}


export interface AuthResponse {
    accessToken: string
    refreshToken: string
    user: IUser
}


export interface AlbumState {
    status: "success" | "default"
    error: string,
    followedAlbumsIds: number[];
    followedAlbums: IAlbum[]
}


export interface PlaylistState {
    myPlaylists: IPlaylist[];
    followedPlaylistsIds: number[];
    followedPlaylists: IPlaylist[];
}


export interface PlayerState {
    paused: boolean;
    currentSong: ISong;
    currentSongIdx: number | null;
    currentTime: number;
    volume: number;
    songsList: ISong[];
    playlistId: number | undefined
}