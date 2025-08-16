import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB=async()=>
{
    try
    {
        const conn=await mongoose.connect(ENV_VARS.MONGO_URI);
        console.log(`\nMongoDB connected : ${conn.connection.host}\n`);
    }
    catch (error)
    {
        console.error(`\nError connecting MongoDB : ${error.message}\n`);
        process.exit(1);
    }
}