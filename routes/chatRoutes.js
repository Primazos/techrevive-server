import express from "express";
import {
  createChat,
  getChatById,
  getChatsByProduct,
  getChatsByUser,
  deleteChat,
} from "../controllers/chatController.js";

const router = express.Router();

// GET
router.get("/get-chat/:id", getChatById);
router.get("/get-chats-by-product/:productId", getChatsByProduct);
router.get("/get-chats-by-user/:userId", getChatsByUser);

// POST
router.post("/add-chat/", createChat);

// DELETE
router.delete("/delete-chat/:id", deleteChat);

export default router;
