import UserService from "../../services/ModelsServices/UserService";
import { Route } from "../../types";

class UserController {
    getUser: Route = async (req, res, next) => {
        try {
            // @ts-expect-error
            const user = await UserService.getUser(req.params.id || req.user.id)
            return res.json(user)
        } catch (err) {
            next(err)
        }
    }


    updateAvatar: Route = async (req, res, next) => {
        try {
            req.body.image = `/${req!.file!.path}`
            //@ts-expect-error
            req.body.id = parseInt(req.user.id)
            const user = await UserService.updateUser(req.body)
            return res.json(user)
        } catch (err) {
            next(err)
        }
    }


    getUsersByQuery: Route = async (req, res, next) => {
        try {
            const users = await UserService.findUsersByQuery(req.params.query)
            return res.json(users)
        } catch (err) {
            next(err)
        }
    }
}


export default new UserController()