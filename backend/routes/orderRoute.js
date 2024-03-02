import express from "express";
import  { addOrderItems, getMyOrderItems, getOrderById, updateOrderToDelivered, updateOrderToPaid, getAllOrder } from "../controllers/orderController.js";
import { protect, admin } from "../middleware/loginMiddleware.js";

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, admin, getAllOrder);
router.route('/myorder').get(protect, getMyOrderItems);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid); 
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered); 

export default router; 