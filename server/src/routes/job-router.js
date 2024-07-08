import express from "express"
import { jobValidation } from "../middleware/job-validation.js"
import { createJob, deleteJob, getAllJobs, getJobById, getStats, updateJob } from "../controllers/job-controller.js"
import { validationIdParam } from "../middleware/validation-id-param.js"

export const jobRouter = express.Router()

jobRouter.get("/", getAllJobs)
jobRouter.route("/stats").get(getStats)
jobRouter.get("/:id", validationIdParam, getJobById)
jobRouter.post("/", jobValidation, createJob)
jobRouter.patch("/:id", validationIdParam, jobValidation, updateJob)
jobRouter.delete("/:id", validationIdParam, deleteJob)