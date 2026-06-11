import express from "express";
import admin from "../Middleware/adminMiddleware.js";
import protect from "../Middleware/authMiddleware.js";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../Controller/productController.js";
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, upload.single('image'), createProduct);

router.route('/:id').get(getProductById).put(protect, admin, upload.single('image'), updateProduct).delete(protect, admin, deleteProduct);

export default router;