import express from "express";
import {
  getProductById,
  getProductsByUserId,
  getProductsByCategory,
  addProduct,
  updateProduct,
  markProductAsSold,
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

// PATCH
router.patch("/mark-product-as-sold/:id", markProductAsSold); 

// DELETE
router.delete("/delete-product/:id", deleteProduct);

export default router;
