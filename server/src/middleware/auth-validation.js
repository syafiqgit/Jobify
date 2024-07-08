import { body } from "express-validator";
import { validateInput } from "./validation-errors.js";

export const RegisterValidation = validateInput([
    body("name").notEmpty().withMessage("Name is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
])

export const LoginValidation = validateInput([
    body("email").notEmpty().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required")
])