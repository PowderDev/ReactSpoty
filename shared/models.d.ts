export interface IUser {
    id: number
    email: string;
    nickname: string;
    password: string;
    image: string;
    listeners: number;
}

export interface ISong {
    id: number;
    title: string;
    users: IUser[];
    image: string;
    audio: string;
    album_title?: string;
    album_id?: number;
    duration: number;
    listeners: number;
}

export type IPlaylist = {
    id: number;
    title: string;
    author: IUser;
    image: string;
    public: boolean;
    songs: ISong[];
    listeners: number;
}

export type IAlbum = {
    id: number;
    title: string;
    users: IUser[];
    image: string;
    songs: ISong[];
    listeners: number;
}