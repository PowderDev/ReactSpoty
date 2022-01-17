import jwt from 'jsonwebtoken'
import config from "../../config"
import Token from '../../models/Token'

class TokenService {
    generateTokens(payload: any) {
        const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, { expiresIn: '1d' })
        const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, { expiresIn: '30d' })

        return {
            accessToken,
            refreshToken
        }
    }

    
    async saveToken(userId: string, refreshToken: string) {
        const tokenData = await Token.findOne({ where: { userId } })

        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }

        const token = await Token.create({ userId, refreshToken })
        return token;
    }


    async removeToken(refreshToken: string) {
        await Token.destroy({ where: { refreshToken } })
    }


    validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, config.JWT_ACCESS_SECRET)
            return userData
        } catch (err) {
            console.log(err)
            return null
        }
    }


    validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(token, config.JWT_REFRESH_SECRET)
            return userData
        } catch (err) {
            return null
        }
    }


    async findToken(refreshToken: string) {
        const tokenData = await Token.findOne({ where: { refreshToken } })
        const temp = tokenData
        tokenData?.destroy()
        return temp
    }
}

export default new TokenService()