import { IUser } from "../../shared/models";

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser
}