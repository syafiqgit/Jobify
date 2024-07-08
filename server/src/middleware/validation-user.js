import { body } from "express-validator"
import { validateInput } from "./validation-errors.js"

export const updateUserValidation = validateInput([
    body("name").notEmpty().withMessage("Name is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("location").notEmpty().withMessage("location is required"),
])