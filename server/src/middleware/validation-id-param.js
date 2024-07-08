import { validateInput } from "./validation-errors.js";
import { param } from "express-validator"
import mongoose from "mongoose";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../errors/custom-errors.js";
import { jobModel } from "../models/job-model.js";
import { user_role } from "../utils/constant.js";

export const validationIdParam = validateInput([
    param("id").custom(async (value, { req }) => {
        const isValidId = mongoose.Types.ObjectId.isValid(value)
        if (!isValidId) throw new BadRequestError("Invalid MongoDB Id")
        const job = await jobModel.findById(value)
        if (!job) throw new NotFoundError(`No job with Id ${value}`)
        const isAdmin = req.user.role === user_role.admin
        const isOwner = req.user.id === job.created_by.toString()
        if (!isAdmin && !isOwner) throw new UnauthorizedError("Unauthorized access")
    })
])