import jwt from "jsonwebtoken"
export const createToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: "7d" })
    return token
}

export const verifyToken = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN)
    return decoded
}