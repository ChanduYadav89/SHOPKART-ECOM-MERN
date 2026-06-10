import User from "../Models/userModel.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"

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
         // hased password before storing in database
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        //new user are created in database
        const createUser = await User.create({name , email, hashedPassword})

        const Token = jwt.sign({
           id : createUser._id,
        }, process.env.JWT_SECRET)


        
        
    } catch (error) {
        
    }
}