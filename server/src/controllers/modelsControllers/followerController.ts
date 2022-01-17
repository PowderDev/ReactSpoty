import FollowerService from "../../services/ModelsServices/FollowerService";
import { Route } from "../../types";

class FollowerController {
    followSong: Route = async (req, res, next) => {
        try {
            //@ts-expect-error
            const song = await FollowerService.addFollowerToSong(parseInt(req.params.id), req.user.id)
            return res.send(song)
        } catch (err) {
            next(err)
        }
    }


    getAllFollowedSongs: Route = async (req, res, next) => {
        try {
            //@ts-expect-error
            const songs = await FollowerService.getFollowedSongs(parseInt(req.user.id))
            return res.json(songs)
        } catch (err) {
            next(err)
        }
    }


    followPlaylist: Route = async (req, res, next) => {
        try {
            //@ts-expect-error
            const playlist = await FollowerService.addFollowerToPlaylist(parseInt(req.params.id), req.user.id)
            return res.send(playlist)
        } catch (err) {
            next(err)
        }
    }


    getAllFollowedPlaylists: Route = async (req, res, next) => {
        try {
            //@ts-expect-error
            const playlists = await FollowerService.getFollowedPlaylists(parseInt(req.user.id))
            return res.json(playlists)
        } catch (err) {
            next(err)
        }
    }


    followAlbum: Route = async (req, res, next) => {
        try {
            //@ts-expect-error
            const album = await FollowerService.addFollowerToAlbum(parseInt(req.params.id), req.user.id)
            return res.send(album)
        } catch (err) {
            next(err)
        }
    }


    getAllFollowedAlbums: Route = async (req, res, next) => {
        try {
            //@ts-expect-error
            const albums = await FollowerService.getFollowedAlbums(parseInt(req.user.id))
            return res.json(albums)
        } catch (err) {
            next(err)
        }
    }


    unfollowSong: Route = async (req, res, next) => {
        try {
            //@ts-expect-error
            await FollowerService.removeFollowerFromSong(parseInt(req.params.id), req.user.id)
            return res.send({ success: true })
        } catch (err) {
            next(err)
        }
    }
    

    unfollowPlaylist: Route = async (req, res, next) => {
        try {
            //@ts-expect-error
            await FollowerService.removeFollowerFromPlaylist(parseInt(req.params.id), req.user.id)
            return res.send({ success: true })
        } catch (err) {
            next(err)
        }
    }

    
    unfollowAlbum: Route = async (req, res, next) => {
        try {
            //@ts-expect-error
            await FollowerService.removeFollowerFromAlbum(parseInt(req.params.id), req.user.id)
            return res.send({ success: true })
        } catch (err) {
            next(err)
        }
    }
}


export default new FollowerController()