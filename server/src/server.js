import "express-async-error"
import express from "express"
import cors from "cors"
import morgan from "morgan"
import * as dotenv from "dotenv"
import cookieParser from "cookie-parser"
dotenv.config()
import { dbConnection } from "./configs/db-connection.js"
import { errorHandler } from "./middleware/error-handler.js"
import { NotFoundError } from "./errors/custom-errors.js"
import { jobRouter } from "./routes/job-router.js"
import { authRouter } from "./routes/auth-router.js"
import { userRouter } from "./routes/user-router.js"
import { dirname } from "path"
import { fileURLToPath } from "url"
import path from "path"
import cloudinary from "cloudinary"
import helmet from "helmet"
import mongoSanitize from "express-mongo-sanitize"
import router from "./routes/router.js"
dbConnection()

const app = express()
const port = process.env.PORT
const __dirname = dirname(fileURLToPath(import.meta.url))
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(helmet())
app.use(mongoSanitize())
app.use(express.static(path.resolve(__dirname, "/public",)))
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}
app.use(router)
app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port ${port}`))