import { upload } from './../../services/UtilServices/UploadService';
import { Router } from 'express'
import albumController from '../../controllers/modelsControllers/albumController'
import auth from '../../middlewares/auth'

const router = Router()

router.post("/album", auth, upload.fields([{name: "image"}, {name: "audios"}]), albumController.createAlbum)
router.get("/albums/popular", albumController.getMostPopularAlbums)
router.get("/albums/search/:query", albumController.getSearchedAlbums)

router.get("/album/:id", albumController.getAlbum)
router.get("/albums/:id", albumController.getUsersAlbums)



export default router