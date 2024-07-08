import express from "express"
import { authRouter } from "./auth-router.js"
import { userRouter } from "./user-router.js"
import { jobRouter } from "./job-router.js"
import { authenticatedUser, authorizedPermission } from "../middleware/auth-middleware.js"
import { getApplicationStatus } from "../controllers/user-controller.js"
import { user_role } from "../utils/constant.js"

const router = express.Router()

router.use("/api/v1/auth", authRouter)
router.use(authenticatedUser)
router.use("/api/v1/user", userRouter)
router.use("/api/v1/job", jobRouter)
router.get("/api/v1/admin/stats", [authorizedPermission(user_role.admin)], getApplicationStatus)


export default router