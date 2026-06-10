import User from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import sendEmail from "../Utils/sendEmail.js";

dotenv.config();


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" })
}

// Regristering user

async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if User is already existed
    const userAlreadyExist = await User.findOne({ email });

    if (userAlreadyExist) {
      return res.status(409).json({
        success: false,
        message: "User is already existed from this email",
      });
    }
    // hased password before storing in database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //new user are created in database
    const createUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate OTP and send email to user for verification
    if (createUser) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a random 6-digit OTP

      const message = `
            welcome to Shopkart, ${name}! Thanks for registering with us. We are excited to have you as part of our community. To complete your registration, please use the following One-Time Password (OTP):

            Your OTP for registration is: ${otp}`;

      await sendEmail({
        email: createUser.email,
        subject: "OTP for registration",
        message,
      });

      res.status(201).json({
        id : createUser._id,
        name : createUser.name,
        email : createUser.email,
        role : createUser.role,
      });
    }else{
        res.status(400).json({
            success : false,
            message : "Invalid user data"
        })
    }

  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}
