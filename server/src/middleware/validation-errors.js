import { validationResult } from "express-validator"
import { BadRequestError, NotFoundError } from "../errors/custom-errors.js"

export const validateInput = (validators) => {
  return [validators, validateInputMiddleware];
};

const validateInputMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    const isJobNotFoundError = errorMessages[0].startsWith("No job");
    const error = isJobNotFoundError ? new NotFoundError(errorMessages) : new BadRequestError(errorMessages);
    throw error;
  }
  next();
};
