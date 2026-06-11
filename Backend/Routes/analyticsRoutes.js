import express from "express";
import { getAdminStats } from "../Controller/analyticsController.js";
import protect from "../Middleware/authMiddleware.js";
import admin from "../Middleware/adminMiddleware.js";

const router = express.Router();

router.get("/admin-stats", protect, admin, getAdminStats);

export default router;
