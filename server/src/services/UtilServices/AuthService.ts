import User, { Follower } from "../../models/User"
import bcrypt from 'bcryptjs'
import { v4 } from 'uuid'
import tokenService from './TokenService'
import UserDto from "../../dtos/user-dto"
import ApiError from "../../exceptions/exceptions"
import jwt from 'jsonwebtoken'
import { IUser } from "../../../../shared/models"
import { Op } from "sequelize"


class UserService {
    async register(nickname: string, email: string, password: string) {
        const candidate = await User.findOne({
            where: {
                [Op.or]: [
                    { email: { [Op.eq]: email } },
                    { nickname: { [Op.eq]: nickname } }
                ]
            }
        })

        if (candidate) {
            throw ApiError.BadRequest('User with this email or nickname already exists')
        }

        const hashedPassword = await bcrypt.hash(password, 3)

        const user = await User.create({
            nickname,
            email,
            password: hashedPassword,
        })

        await Follower.create({ userId: user.id })

        return this.generateTokens(user)
    }

    
    async login(login: string, password: string) {
        const candidate = await User.findOne({
            where: {
                [Op.or]: [
                    { email: { [Op.eq]: login } },
                    { nickname: { [Op.eq]: login } }
                ]
            }
        })

        if (!candidate) {
            throw ApiError.BadRequest('User with this email or nickname does not exist')
        }


        const isPassEquals = await bcrypt.compare(password, candidate.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest('Invalid password')
        }

        return this.generateTokens(candidate)
    }


    async logout(refreshToken: string) {
        await tokenService.removeToken(refreshToken)
    }


    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }

        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)

        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }

        // @ts-expect-error
        const user = await User.findByPk(userData['id'])

        // @ts-expect-error
        return this.generateTokens(user)
    }


    async generateTokens(user: IUser) {
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(String(userDto.id), tokens.refreshToken)
        userDto.image = user.image

        return { ...tokens, user: userDto }
    }

}

export default new UserService()