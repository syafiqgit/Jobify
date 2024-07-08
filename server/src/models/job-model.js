import mongoose from "mongoose"
import { job_status, job_type } from "../utils/constant.js"

const jobSchema = new mongoose.Schema({
    company: String,
    position: String,
    job_type: {
        type: String,
        enum: Object.values(job_type),
        default: job_type.full_time
    },
    job_location: {
        type: String,
        default: "My city"
    },
    job_status: {
        type: String,
        enum: Object.values(job_status),
        default: job_status.pending
    },
    created_by: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    }
}, { timestamps: true })

export const jobModel = mongoose.model("job", jobSchema)