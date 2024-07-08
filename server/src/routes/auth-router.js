import express from "express"
import { loginUser, logoutUser, registerUser } from "../controllers/auth-controller.js"
import { LoginValidation, RegisterValidation } from "../middleware/auth-validation.js"
import rateLimiter from "express-rate-limit"

export const authRouter = express.Router()

const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { message: "Too many requests from this IP, please try again after 15 minutes" },

})

authRouter.post("/register", RegisterValidation, registerUser)
authRouter.post("/login", LoginValidation, loginUser)
authRouter.get("/logout", logoutUser)