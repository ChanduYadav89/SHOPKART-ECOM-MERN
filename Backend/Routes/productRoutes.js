import express from "express";
import admin from "../Middleware/adminMiddleware.js";
import protect from "../Middleware/authMiddleware.js";

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct)

export default router;