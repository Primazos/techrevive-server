import express from "express";
import {
  getCreditCardsByUser,
  getDefaultCreditCard,
  addCreditCard,
  selectDefaultCreditCard,
  deleteCreditCard,
} from "../controllers/creditCardController.js";

const router = express.Router();

// GET
router.get("/get-credit-cards/:userId", getCreditCardsByUser);
router.get("/get-default-credit-card/:userId", getDefaultCreditCard);

// POST
router.post("/add-credit-card/", addCreditCard);

// PUT
router.put("/select-default-credit-card/:id", selectDefaultCreditCard);

// DELETE
router.delete("/delete-credit-card/:id", deleteCreditCard);

export default router;
