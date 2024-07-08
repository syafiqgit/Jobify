import express from "express"
import { getCurrentUser, updateUser } from "../controllers/user-controller.js"
import { updateUserValidation } from "../middleware/validation-user.js"
import uploadAvatar from "../middleware/multer.js"

export const userRouter = express.Router()

userRouter.get("/", getCurrentUser)
userRouter.patch("/", uploadAvatar, updateUserValidation, updateUser)