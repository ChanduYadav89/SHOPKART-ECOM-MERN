import express from 'express';
import { addOrderItems, getMyOrders, getOrders, updateOrderStatus } from '../Controller/orderController.js';
import protect from '../Middleware/authMiddleware.js';
import admin from '../Middleware/adminMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id/status').put(protect, admin, updateOrderStatus);

export default router;
