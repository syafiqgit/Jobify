import { StatusCodes } from "http-status-codes";

export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    const messageError = err.message || "Internal server error"
    res.status(statusCode).json({ message: messageError })
}   