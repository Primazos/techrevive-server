import express from "express";
import {
  getTransactionById,
  getTransactionsByUserId,
  addTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

// GET
router.get("/get-transaction/:id", getTransactionById);
router.get("/get-transactions-by-user/:userId", getTransactionsByUserId);

// POST
router.post("/add-transaction/", addTransaction);

// DELETE
router.delete("/delete-transaction/:id", deleteTransaction);

export default router;