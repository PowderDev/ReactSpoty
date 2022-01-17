import { Router } from 'express'
import authController from "../../controllers/utilControllers/authController"

const router = Router()

router.post('/register', authController.registration)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/refresh', authController.refresh)


export default router