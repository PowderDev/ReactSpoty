import AuthService from "../../services/UtilServices/AuthService";
import { NextFunction, Request, Response } from "express";
import config from "../../config";
import { validationResult } from "express-validator";
import ApiError from "../../exceptions/exceptions";


class AuthController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array() as never[]))
            }

            const { email, password, nickname } = req.body
            const userData = await AuthService.register(nickname, email, password)

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (err) {
            console.log(err);

            return next(err)
        }
    }


    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { login, password } = req.body
            const userData = await AuthService.login(login, password)

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (err) {
            next(err)
        }
    }


    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies
            await AuthService.logout(refreshToken)

            res.clearCookie('refreshToken')
            return res.status(200).json({
                success: true
            })
        } catch (err) {
            next(err)
        }
    }


    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.cookies)
            const { refreshToken } = req.cookies
            const userData = await AuthService.refresh(refreshToken)

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)

        } catch (err) {
            console.log(err);
        }
    }

}

export default new AuthController()