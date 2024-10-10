import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDb = async () => {
    try {
        const conn = await mongoose.connect(ENV_VARS.MONGO_URI);

    } catch (error) {
        process.exit(1) // 1 means failure and 0 means success
    }
}