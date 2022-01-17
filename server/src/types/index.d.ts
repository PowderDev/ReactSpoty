import { Request, Response, NextFunction, Error } from 'express'
import UserDto from '../dtos/user-dto'

export type Route = (req: Request, res: Response, next: NextFunction) => void
export type ErrorRoute = (err: Error, req: Request, res: Response, next: NextFunction) => void

