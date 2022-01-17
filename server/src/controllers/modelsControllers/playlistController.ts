import PLaylistService from "../../services/ModelsServices/PLaylistService";
import { Route } from "../../types";

class PlaylistController {

    createPlaylist: Route = async (req, res, next) => {
        try {
            //@ts-expect-error
            const playlist = await PLaylistService.createPlaylist(req.body, req.user.id)
            return res.json(playlist)
        } catch (err) {
            next(err)
        }
    }

    
    getPlaylistById: Route = async (req, res, next) => {
        try {
            const playlist = await PLaylistService.getPlaylistById(Number(req.params.id))
            return res.json(playlist)
        } catch (err) {
            next(err)
        }
    }


    getUsersPlaylists: Route = async (req, res, next) => {
        try {
            //@ts-expect-error
            const playlists = await PLaylistService.getUsersPlaylists(req.user.id)
            return res.json(playlists)
        } catch (err) {
            next(err)
        }
    }


    getMostPopularPlaylists: Route = async (req, res, next) => {
        try {
            const playlists = await PLaylistService.getMostPopularPlaylists()
            return res.json(playlists)
        } catch (err) {
            next(err)
        }
    }


    addSong: Route = async (req, res, next) => {
        try { 
            //@ts-expect-error
            await PLaylistService.addSong(req.params.playlistId, req.params.songId)
            return res.json({success: true})
        } catch (err) {
            next(err)
        }
    }


    getPlaylistsByQuery: Route = async (req, res, next) => {
        try {
            const playlists = await PLaylistService.getPlaylistsByQuery(req.params.query)
            return res.json(playlists)
        } catch (err) {
            next(err)
        }
    }


    updateImage: Route = async (req, res, next) => {
        try { 
            //@ts-expect-error
            const playlist = await PLaylistService.updatePlaylistImage(req.file.path, req.params.id)
            return res.json(playlist)
        } catch (err) {
            next(err)
        }
    }
}


export default new PlaylistController()