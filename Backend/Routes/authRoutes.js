import express from "express";
import { registerUser, loginUser, getAllUsers} from "../Controller/authController.js";
import admin from "../Middleware/adminMiddleware.js";
import auth from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/fetch-users",admin, auth , getAllUsers)

export default router;