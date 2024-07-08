import asyncHandler from "express-async-handler"
import { userModel } from "../models/user-model.js"
import { StatusCodes } from "http-status-codes"
import { comparePassword, hashingPassword } from "../utils/password-utils.js"
import { BadRequestError } from "../errors/custom-errors.js"
import { createToken } from "../utils/token.js"

export const registerUser = asyncHandler(async (req, res) => {
    const isAdminUser = await userModel.countDocuments() === 0
    req.body.role = isAdminUser ? "Admin" : "User"

    const emailAlreadyExist = await userModel.findOne({ email: req.body.email })
    if (emailAlreadyExist) throw new BadRequestError("Email already exist")

    req.body.password = await hashingPassword(req.body.password)
    const user = await userModel.create(req.body)

    res.status(StatusCodes.CREATED).json({
        message: "Register success",
        data: user
    })
})

export const loginUser = asyncHandler(async (req, res) => {
    const user = await userModel.findOne({ email: req.body.email })
    if (!user) throw new BadRequestError("Invalid email or password")
    const isPasswordCorrect = await comparePassword(req.body.password, user.password)
    if (!isPasswordCorrect) throw new BadRequestError("Invalid password or password")
    const token = createToken({ id: user._id, name: user.name, role: user.role })
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie("token", token), {
        maxAge: oneDay,
        httpOnly: true,
        secure: true
    }
    res.status(StatusCodes.ACCEPTED).json({
        message: "Login success",
        token: token
    })
})

export const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("token")
    res.status(StatusCodes.ACCEPTED).json({
        message: "Logout success"
    })
})