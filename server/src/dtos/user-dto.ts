import { throws } from "assert";
import { IUser } from "../../../shared/models"

export default class UserDto {
    nickname: string;
    email: string;
    id: number;
    image?: string;

    constructor(model: IUser) {
        this.email = model.email
        this.id = model.id
        this.nickname = model.nickname
    }
}