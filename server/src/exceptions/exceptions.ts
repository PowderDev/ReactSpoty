import { ValidationError } from "sequelize/dist"

export default class ApiError extends Error {
    constructor(public status: number, message: string, public errors = []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static UnauthorizedError() {
        return new ApiError(401, 'User is Unauthorized')
    }

    static BadRequest(message: string, errors = []) {
        return new ApiError(400, message, errors)
    }
}