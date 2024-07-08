import mongoose from "mongoose"
import { user_role } from "../utils/constant.js"

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    location: { type: String, default: "My city" },
    role: {
        type: String,
        enum: Object.values(user_role),
        default: user_role.user
    },
    avatar: String,
    avatar_public_id: String,
}, { timestamps: true })

userSchema.methods.toJSON = function () {
    let obj = this.toObject();
    delete obj.password;
    return obj;
};

export const userModel = mongoose.model("user", userSchema)