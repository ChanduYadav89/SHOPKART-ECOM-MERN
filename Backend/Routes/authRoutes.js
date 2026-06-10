import express from "express";
import { registerUser, loginUser, getAllUsers} from "../Controller/authController.js";

const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/fetch-users", getAllUsers)
export default router;