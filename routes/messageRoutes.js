import express from "express";
import {
  createMessage,
  getMessagesByChat,
  deleteMessage,
} from "../controllers/messageController.js";

const router = express.Router();

// GET
router.get("/get-messages/:chatId", getMessagesByChat);

// POST
router.post("/add-message/", createMessage);

// DELETE
router.delete("/delete-message/:id", deleteMessage);

export default router;
