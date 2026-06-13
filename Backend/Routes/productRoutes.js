import express from "express";
import admin from "../Middleware/adminMiddleware.js";
import protect from "../Middleware/authMiddleware.js";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../Controller/productController.js";
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, upload.single('image'), createProduct);

router.get('/external', async (req, res) => {
    try {
        const response = await fetch('https://dummyjson.com/products?limit=100');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('External products fetch error:', error);
        res.status(500).json({ message: 'Failed to fetch external products' });
    }
});

router.route('/:id').get(getProductById).put(protect, admin, upload.single('image'), updateProduct).delete(protect, admin, deleteProduct);

export default router;