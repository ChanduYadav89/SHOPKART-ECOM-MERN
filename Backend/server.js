import express from "express";
import dotenv from "dotenv"
import connectDB from "./Config/db.js";
import authRoutes from "./Routes/authRoutes.js";

dotenv.config()
connectDB()
const app = express()
app.use(express.json())
const Port = process.env.PORT
// app.use(cors());

app.get('/', (req, res)=>{
    res.send("Hello world")
})

app.use('/api/auth', authRoutes)

app.listen(Port, ()=>{
    console.log(`Server is running on Port ${Port}`)
})