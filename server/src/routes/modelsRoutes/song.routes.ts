import { Router } from 'express'
import songController from '../../controllers/modelsControllers/songController'
import auth from '../../middlewares/auth'
import { upload } from '../../services/UtilServices/UploadService'

const router = Router()

router.post("/song", auth, upload.fields([{name: "image"}, {name: "audio"}]), songController.uploadSong)
router.put("/song/listeners", auth, songController.addListener)

router.get("/songs/recently", auth, songController.getRecentlyListened)
router.get("/songs/popular", songController.getMostPopular)
router.get("/songs/search/:query", songController.getSongsByQuery)
router.get("/songs/:id", songController.getUsersSongs)



export default router