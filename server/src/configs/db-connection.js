import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connect to database success")
    } catch (error) {
        console.log("Failed connect to database")
        console.log(`Error : ${error}`)
    }
}