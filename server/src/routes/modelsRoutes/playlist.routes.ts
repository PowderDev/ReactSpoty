import { upload } from './../../services/UtilServices/UploadService';
import { Router } from 'express'
import auth from '../../middlewares/auth'
import playlistController from '../../controllers/modelsControllers/playlistController';

const router = Router()

router.post("/playlist", auth, playlistController.createPlaylist)
router.get("/playlist/:id", playlistController.getPlaylistById)
router.put("/playlist/:playlistId/add/:songId", playlistController.addSong)

router.put('/playlist/update/:id', upload.single("image"),  playlistController.updateImage)

router.get("/playlists", auth, playlistController.getUsersPlaylists)
router.get("/playlists/popular", playlistController.getMostPopularPlaylists)
router.get("/playlists/search/:query", playlistController.getPlaylistsByQuery)


export default router