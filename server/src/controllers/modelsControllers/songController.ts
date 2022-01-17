import SongService from "../../services/ModelsServices/SongService";
import { Route } from "../../types";


class SongController {

    uploadSong: Route = async (req, res, next) => {
        try {
            console.log(req.files)
            //@ts-expect-error
            req.body.image = req.files.image[0].path
            //@ts-expect-error
            req.body.audio = req.files.audio[0].path
            req.body.authors = req.body.authors.split(',').map(Number)
            const song = await SongService.createSong(req.body)
            return res.json(song)
        } catch (err) {
            next(err)
        }
    }


    getUsersSongs: Route = async (req, res, next) => {
        try {
            //@ts-expect-error
            const songs = await SongService.getUsersSongs(req.params.id, 5)
            return res.json(songs)
        } catch (err) {
            next(err)
        }
    }


    getSongsByQuery: Route = async (req, res, next) => {
        try {
            const songs = await SongService.getSongsByQuery(req.params.query)
            return res.json(songs)
        } catch (err) {
            next(err)
        }
    }


    addListener: Route = async (req, res, next) => {
        try {
            //@ts-expect-error
            await SongService.addListener(req.body, Number(req.user.id))
            return res.json({success: true})
        } catch (err) {
            next(err)
        }
    }


    getRecentlyListened: Route = async (req, res, next) => {
        try {
            //@ts-expect-error
            const songs = await SongService.userRecentlyListened(Number(req.user.id))
            return res.json(songs)
        } catch (err) {
            next(err)
        }
    }


    getMostPopular: Route = async (req, res, next) => {
        try {
            const songs = await SongService.getMostPopular()
            return res.json(songs)
        } catch (err) {
            next(err)
        }
    }
}


export default new SongController()