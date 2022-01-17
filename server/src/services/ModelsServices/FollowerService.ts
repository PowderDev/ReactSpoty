import Album from "../../models/Album";
import Playlist from "../../models/Playlist";
import Song from "../../models/Song";
import User, { Follower, FollowerAlbum, FollowerPlaylist, FollowerSong } from "../../models/User";

class FollowerService {
    async addFollowerToSong(songId: number, userId: number) {
        const follower = await Follower.findOne({ where: { userId } })
        const song = await Song.findByPk(songId, { include: { model: User, attributes: ["nickname", "id"] } })
        //@ts-expect-error
        await follower.addSong(song)
        return song
    }

    async addFollowerToPlaylist(playlistId: number, userId: number) {
        const follower = await Follower.findOne({ where: { userId } })
        const playlist = await Playlist.findByPk(playlistId, { include: [
            { model: User, attributes: ["nickname", "id"], as: "author" }
        ] })
        //@ts-expect-error
        await follower.addPlaylist(playlist)
        return playlist
    }

    async addFollowerToAlbum(albumId: number, userId: number) {
        const follower = await Follower.findOne({ where: { userId } })
        const album = await Album.findByPk(albumId, { include: { model: User, attributes: ["nickname", "id"]}})
        //@ts-expect-error
        await follower.addAlbum(album)
        return album
    }


    
    async getFollowedSongs(userId: number) {
        const follower = await Follower.findOne({ where: { userId } })
        //@ts-expect-error
        const songs = await follower.getSongs({ include: [{ model: User, attributes:["nickname", "id"] }] })
        return songs
    }

    async getFollowedPlaylists(userId: number) {
        const follower = await Follower.findOne({ where: { userId } })
        //@ts-expect-error
        const playlists = await follower.getPlaylists({ include: [
            { model: User, attributes:["nickname", "id"], as: "author" }] })
        return playlists
    }

    async getFollowedAlbums(userId: number) {
        const follower = await Follower.findOne({ where: { userId } })
        //@ts-expect-error
        const albums = await follower.getAlbums({ include: [{ model: User, attributes:["nickname", "id"] }] })
        return albums
    }



    async removeFollowerFromSong(songId: number, userId: number) {
        const follower = await Follower.findOne({ where: { userId } })
        //@ts-expect-error
        const fs = await FollowerSong.findOne({ songId, followerId: follower.id })
        fs.destroy()
    }

    async removeFollowerFromPlaylist(playlistId: number, userId: number) {
        const follower = await Follower.findOne({ where: { userId } })
        //@ts-expect-error
        const fp = await FollowerPlaylist.findOne({ playlistId, followerId: follower.id })
        fp.destroy()
    }

    async removeFollowerFromAlbum(albumId: number, userId: number) {
        const follower = await Follower.findOne({ where: { userId } })
        //@ts-expect-error
        const fa = await FollowerAlbum.findOne({ albumId, followerId: follower.id })
        fa.destroy()
    }
}


export default new FollowerService()