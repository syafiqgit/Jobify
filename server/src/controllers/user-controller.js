import { StatusCodes } from "http-status-codes"
import asyncHandler from "express-async-handler"
import { userModel } from "../models/user-model.js"
import { BadRequestError } from "../errors/custom-errors.js"
import { jobModel } from "../models/job-model.js"
import cloudinary from "cloudinary"
import { formatImage } from "../middleware/multer.js"
import dayjs from "dayjs"

export const getCurrentUser = asyncHandler(async (req, res) => {
    const { id } = req.user
    const user = await userModel.findById(id)
    res.status(StatusCodes.OK).json({
        message: "Get current user success",
        data: user
    })
})

export const updateUser = asyncHandler(async (req, res) => {
    const newUser = { ...req.body }
    delete newUser.password
    delete newUser.role

    if (req.file) {
        const file = formatImage(req.file)
        const response = await cloudinary.v2.uploader.upload(file)
        newUser.avatar = response.secure_url
        newUser.avatar_public_id = response.public_id
    }

    const emailAlreadyExist = await userModel.findOne({ email: req.body.email })
    if (emailAlreadyExist && emailAlreadyExist.id !== req.user.id) throw new BadRequestError("Email already exist")

    const updatedUser = await userModel.findByIdAndUpdate(req.user.id, newUser)

    if (req.file && updatedUser.avatar_public_id) {
        await cloudinary.v2.uploader.destroy(updatedUser.avatar_public_id)
    }

    res.status(StatusCodes.OK).json({
        message: "Update user success",
        data: updatedUser
    })
}
)

export const getApplicationStatus = asyncHandler(async (req, res) => {
    const userCounts = await userModel.countDocuments()
    const jobCounts = await jobModel.countDocuments()

    let monthlyApplicationsUsers = await userModel.aggregate([
        {
            $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" },
                },
                count: { $sum: 1 }
            }
        },
        { $sort: { "_id.year": -1, "_id.month": -1 } },
    ])

    let monthlyApplicationsJobs = await jobModel.aggregate([
        {
            $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" },
                },
                count: { $sum: 1 }
            }
        },
        { $sort: { "_id.year": -1, "_id.month": -1 } },
    ])

    monthlyApplicationsUsers = monthlyApplicationsUsers.map((item) => {
        const { _id: { year, month }, count, } = item
        const date = dayjs().month(month - 1).year(year).format("MMM YYYY")
        return { date, count }
    }).reverse()

    monthlyApplicationsJobs = monthlyApplicationsJobs.map((item) => {
        const { _id: { year, month }, count, } = item
        const date = dayjs().month(month - 1).year(year).format("MMM YYYY")
        return { date, count }
    }).reverse()

    res.status(StatusCodes.OK).json({
        message: "Get application status success",
        data: {
            users: userCounts,
            jobs: jobCounts,
            monthly_applications_users: monthlyApplicationsUsers,
            monthly_applications_jobs: monthlyApplicationsJobs
        }
    })
}
)