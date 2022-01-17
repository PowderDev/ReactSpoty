import { Router } from 'express'
import followerController from '../../controllers/modelsControllers/followerController'
import auth from '../../middlewares/auth'

const router = Router()

router.put("/follow/song/:id", auth, followerController.followSong)
router.put("/follow/playlist/:id", auth, followerController.followPlaylist)
router.put("/follow/album/:id", auth, followerController.followAlbum)


router.get("/followed/songs", auth, followerController.getAllFollowedSongs)
router.get("/followed/playlists", auth, followerController.getAllFollowedPlaylists)
router.get("/followed/albums", auth, followerController.getAllFollowedAlbums)


router.put("/unfollow/song/:id", auth, followerController.unfollowSong)
router.put("/unfollow/playlist/:id", auth, followerController.unfollowPlaylist)
router.put("/unfollow/album/:id", auth, followerController.unfollowAlbum)


export default router