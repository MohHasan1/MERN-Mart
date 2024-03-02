import express from "express";
import { getProducts, getProductById } from "../controllers/productController.js";

const router = express.Router();

// @desc Get all Products
router.route('/').get(getProducts);

// @desc Get single Product
router.route('/:id').get(getProductById);

export default router;