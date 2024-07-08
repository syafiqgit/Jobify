import { UnauthenticatedError, UnauthorizedError } from "../errors/custom-errors.js"
import { verifyToken } from "../utils/token.js"

export const authenticatedUser = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    if (!token) {
        throw new UnauthenticatedError("Authenticated first")
    }
    const { id, name, role } = verifyToken(token)
    req.user = { id, name, role }
    next()
}

export const authorizedPermission = (...role) => {
    return (req, res, next) => {
        if (!role.includes(req.user.role)) {
            throw new UnauthorizedError("Unauthorized access")
        }
        next()
    }
}
