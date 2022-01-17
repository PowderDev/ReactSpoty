import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/exceptions";
import TokenService from "../services/UtilServices/TokenService";

export default function (req: any, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return next(ApiError.UnauthorizedError())
        }

        const accessToken = authHeader.split(' ')[1]
        if (!accessToken) {
            return next(ApiError.UnauthorizedError())
        }

        const userData = TokenService.validateAccessToken(accessToken)
        if (!userData) {
            return next(ApiError.UnauthorizedError())
        }

        req.user = userData;
        next()

    } catch (err) {
        next(ApiError.UnauthorizedError())
    }
}