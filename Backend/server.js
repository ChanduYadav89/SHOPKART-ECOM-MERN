import express from "express";
import dotenv from "dotenv"
import connectDB from "./Config/db.js";
import authRoutes from "./Routes/authRoutes.js";
import productRoutes from "./Routes/productRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";
import paymentRoutes from "./Routes/paymentRoutes.js";
import analyticsRoutes from "./Routes/analyticsRoutes.js";

dotenv.config()
connectDB()
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : false}))
const Port = process.env.PORT
// app.use(cors());


app.use('/api/auth', authRoutes)
app.use('/api/product', productRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/payment', paymentRoutes)
app.use('/api/analytics', analyticsRoutes)

app.listen(Port, ()=>{
    console.log(`Server is running on Port ${Port}`)
})
