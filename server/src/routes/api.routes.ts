import { Router } from 'express'
import authRoutes from './utilRoutes/auth.routes'
import userRoutes from './modelsRoutes/user.routes'
import songRoutes from './modelsRoutes/song.routes'
import followerRoutes from './modelsRoutes/follower.routes'
import albumRoutes from './modelsRoutes/album.routes'
import playlistRoutes from './modelsRoutes/playlist.routes'


const router = Router()

router.use(authRoutes)
router.use(userRoutes)
router.use(songRoutes)
router.use(followerRoutes)
router.use(albumRoutes)
router.use(playlistRoutes)


export default router