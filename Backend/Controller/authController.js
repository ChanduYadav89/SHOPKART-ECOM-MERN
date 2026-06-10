import User from "../Models/userModel.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

// Regristering user 

async function registerUser(req, res){
    try {
        const {name, email, password} = req.body

        // Check if User is already existed
        const userAlreadyExist = await User.findOne({email})

        if(email){
            return res.status(409).json({
                success : false,
                message : "User is already existed from this email"
            })
        }

        

        const createUser = await User.create({name , email, password})

        const Token = jwt.sign({
           id : createUser._id,
        }, process.env.JWT_SECRET)


        
        
    } catch (error) {
        
    }
}