import {  Op } from 'sequelize';
import ApiError from "../../exceptions/exceptions";
import User from "../../models/User";

interface UserDto {
    id?: number;
    nickname: string;
    email: string;
    image: string;
}


class UserService {
    async getUser(id: number) {
        const user = await User.findOne({ attributes: { exclude: ['password'] }, where: { id } })

        if (!user) {
            throw ApiError.BadRequest(`User with id=${id} doesn't exists`)
        }

        return user
    }


    async updateUser(dto: UserDto) {
        const user = await User.findOne({ where: { id: dto.id } })

        if (!user) {
            throw ApiError.BadRequest(`User with id=${dto.id} doesn't exists`)
        }

        if (!dto.image) {
            dto.image = user.image
        }

        await user.update(dto)
        return user
    }


    async findUsersByQuery(query: string) {
        const users = await User.findAll({ 
            where: { nickname: { [Op.iRegexp]: query } }, 
            limit: 10, attributes: ["image", "nickname", "id"] , 
            order: [["listeners", "DESC"]] 
        })
        
        return users
    }
}


export default new UserService()