import AlbumService from "../../services/ModelsServices/AlbumService";
import { Route } from "../../types";

class AlbumController {

    createAlbum: Route = async (req, res, next) => {
        try {
            
            //@ts-expect-error
            const audios = req.files.audios.map(a => a.path)
            req.body.songs = JSON.parse(req.body.songs)

            console.log(req.body)
            req.body.songs = req.body.songs.map((s: any) => {
                s.audio = audios.find((path: string) => path.includes(s.title))
                return s
            })

            req.body.authors = req.body.authors.split(',').map(Number)

            console.log(req.body)
            
            //@ts-expect-error
            req.body.image = req.files.image[0].path
            const album = await AlbumService.createAlbum(req.body)
            return res.json(album)
        } catch (err) {
            next(err)
        }
    }


    getAlbum: Route = async (req, res, next) => {
        try {
            //@ts-expect-error
            const album = await AlbumService.getAlbumById(req.params.id)
            return res.json(album)
        } catch (err) {
            next(err)
        }
    }


    getUsersAlbums: Route = async (req, res, next) => {
        try {
            //@ts-expect-error
            const albums = await AlbumService.getUsersAlbums(req.params.id)
            return res.json(albums)
        } catch (err) {
            next(err)
        }
    }



    getMostPopularAlbums: Route = async (req, res, next) => {
        try {
            const albums = await AlbumService.getMostPopularAlbums()
            return res.json(albums)
        } catch (err) {
            next(err)
        }
    }



    getSearchedAlbums: Route = async (req, res, next) => {
        try {
            const albums = await AlbumService.getAlbumsByQuery(req.params.query)
            return res.json(albums)
        } catch (err) {
            next(err)
        }
    }

}


export default new AlbumController()