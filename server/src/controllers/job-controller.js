import { StatusCodes } from "http-status-codes"
import { jobModel } from "../models/job-model.js"
import dayjs from "dayjs"
import asyncHandler from "express-async-handler"
import mongoose from "mongoose"

export const getAllJobs = asyncHandler(async (req, res) => {
    const { search, jobStatus, jobType, sort } = req.query


    const queryObject = {
        created_by: req.user.id
    }

    if (search) {
        queryObject.$or = [
            { position: { $regex: search, $options: "i" } },
            { company: { $regex: search, $options: "i" } },
            { job_location: { $regex: search, $options: "i" } },
        ]
    }

    if (jobStatus && jobStatus !== "All") {
        queryObject.job_status = jobStatus
    }

    if (jobType && jobType !== "All") {
        queryObject.job_type = jobType
    }


    const sortOptions = {
        Newest: "-createdAt",
        Oldest: "createdAt",
        "A-Z": "company",
        "Z-A": "-company",
    }

    const sortKey = sortOptions[sort] || sortOptions.Newest

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    const job = await jobModel.find(queryObject).sort(sortKey).skip(skip).limit(limit)

    const totalJobs = await jobModel.countDocuments(queryObject)

    const numberOfPages = Math.ceil(totalJobs / limit)

    res.status(StatusCodes.OK).json({
        message: "Get all jobs success",
        data: {
            total_jobs: totalJobs,
            jobs: job,
            current_page: page,
            total_pages: numberOfPages
        }
    })
})


export const getJobById = asyncHandler(async (req, res) => {
    const { id } = req.params
    const job = await jobModel.findById(id)
    res.status(StatusCodes.OK).json({
        message: "Get job success",
        data: job
    })
})

export const createJob = asyncHandler(async (req, res) => {
    const { id } = req.user
    req.body.created_by = id
    const job = await jobModel.create(req.body)
    res.status(StatusCodes.ACCEPTED).json({
        message: "Create job success",
        data: job
    })
})

export const updateJob = asyncHandler(async (req, res) => {
    const { id: jobId } = req.params;
    const updatedJob = await jobModel.findByIdAndUpdate(jobId, req.body, { new: true });

    res.status(StatusCodes.ACCEPTED).json({
        message: "Job updated successfully",
        data: updatedJob,
    });
})

export const deleteJob = asyncHandler(async (req, res) => {
    const { id: jobId } = req.params;
    const deletedJob = await jobModel.findByIdAndDelete(jobId);

    res.status(StatusCodes.ACCEPTED).json({
        message: "Job deleted successfully",
        data: deletedJob
    });
})

export const getStats = asyncHandler(async (req, res) => {
    const { id } = req.user
    let stats = await jobModel.aggregate([
        { $match: { created_by: new mongoose.Types.ObjectId(id) } },
        { $group: { _id: "$job_status", count: { $sum: 1 } } },
    ])

    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr
        acc[title] = count
        return acc
    }, {})

    console.log(stats)

    let defaultStats = {
        pending: stats.Pending || 0,
        interview_hr: stats["Interview HR"] || 0,
        interview_user: stats["Interview user"] || 0,
        technical_test: stats["Technical test"] || 0,
        recieve_job_offer_letter: stats["Receive job offer letter"] || 0,
        accept_job_offer_letter: stats["Accept job offer letter"] || 0,
        rejected_offer_letter: stats["Rejected offer letter"] || 0,
        rejected_interview_hr: stats["Rejected Interview HR"] || 0,
        rejected_technical_test: stats["Rejected Technical test"] || 0,
        declined: stats.Declined || 0

    }

    let monthlyApplications = await jobModel.aggregate([
        { $match: { created_by: new mongoose.Types.ObjectId(id) } },
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

    monthlyApplications = monthlyApplications.map((item) => {
        const { _id: { year, month }, count, } = item
        const date = dayjs().month(month - 1).year(year).format("MMM YYYY")
        return { date, count }
    }).reverse()

    res.status(StatusCodes.OK).json({
        message: "Get stats success",
        data: {
            status_applications: defaultStats,
            monthly_applications: monthlyApplications
        }
    })
})