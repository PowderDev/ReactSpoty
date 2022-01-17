import { Router } from 'express'
import userController from '../../controllers/modelsControllers/userController'
import auth from '../../middlewares/auth'
import { upload } from '../../services/UtilServices/UploadService'

const router = Router()

router.get("/user", auth, userController.getUser)
router.get("/user/:id", userController.getUser)
router.put('/user/avatar', auth, upload.single("image"), userController.updateAvatar)
router.get("/users/:query", userController.getUsersByQuery)


export default router