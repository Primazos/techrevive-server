import express from "express";
import {
  getProductById,
  getProductsByUserId,
  getProductsByCategory,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// GET
router.get("/get-product/:id", getProductById);
router.get("/get-products-by-user/:userId", getProductsByUserId);
router.get("/get-products-by-category/:category", getProductsByCategory);

// POST
router.post("/add-product/", addProduct);

// PUT
router.put("/update-product/:id", updateProduct);

// DELETE
router.delete("/delete-product/:id", deleteProduct);

export default router;
