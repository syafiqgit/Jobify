import { body } from "express-validator"
import { validateInput } from "./validation-errors.js"
import { job_status, job_type } from "../utils/constant.js"

export const jobValidation = validateInput([
    body("company").notEmpty().withMessage("Company is required"),
    body("position").notEmpty().withMessage("Position is required"),
    body("job_location").notEmpty().withMessage("Location is required"),
    body("job_type").isIn(Object.values(job_type)).withMessage("Invalid status value"),
    body("job_status").isIn(Object.values(job_status)).withMessage("Invalid status value"),
])