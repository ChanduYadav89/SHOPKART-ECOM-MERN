import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);


dotenv.config()

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB)

         console.log("MongoDB connected successfully🚀🚀")
       
    } catch (error) {
        console.error("MongoDB connection failed:", error.message)
        process.exit(1)
    }   
}

export default connectDB;
   