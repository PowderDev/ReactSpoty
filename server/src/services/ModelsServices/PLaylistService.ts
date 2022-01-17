import { Op } from 'sequelize';
import ApiError from '../../exceptions/exceptions';
import Playlist from '../../models/Playlist';
import Song from '../../models/Song';
import User, { PlaylistSong } from '../../models/User';


interface PlaylistDto {
    title: string;
}


class PlaylistService {
    async createPlaylist(dto: PlaylistDto, authorId: number) {
        const candidate = await Playlist.findAll({ where: { title: dto.title, authorId } })

        if (candidate.length > 0) {
            throw ApiError.BadRequest(`Your already have playlist with this title`)
        }
        
        const playlist = await Playlist.create({
            title: dto.title,
            authorId
        })

        return playlist
    }


    async addSong(playlistId: number, songId: number) {
        const exists = await PlaylistSong.findOne({ where: { playlistId, songId } })

        if (exists) {
            throw ApiError.BadRequest("Song already in playlist")
        }

        await PlaylistSong.create({ playlistId, songId })
    }


    async getPlaylistById(id: number) {
        const playlist = await Playlist.findByPk(id, { include: [
            { model: Song, as: "songs", include: [{model: User, attributes: ["nickname", "id"]}] }, 
            { model: User, as: "author", attributes: { exclude: ["password"] } }
        ] })
        return playlist
    }


    async getUsersPlaylists(id: number) {
        const playlists = await Playlist.findAll({ where: { authorId: id } })
        return playlists
    }


    async getMostPopularPlaylists() {
        const playlists = await Playlist.findAll({ 
            order: [['listeners', 'DESC']], 
            limit: 10, 
            include: {model: User, as: "author", attributes: ["nickname", "id"]} 
        })

        return playlists
    }


    async getPlaylistsByQuery(query: string) {
        const playlists = await Playlist.findAll({ 
            where: { title: { [Op.iRegexp]: query } }, 
            order: [["listeners", "DESC"]],
            limit: 10,
            include: { model: User, attributes: ["nickname", "id"], as: "author" } 
        })

        return playlists
    }


    async updatePlaylistImage(image: string, id: number) {
        const playlist = await Playlist.findByPk(id)
        playlist?.update({image})
        return playlist
    }
}

export default new PlaylistService()