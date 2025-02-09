import express from "express";
import {
  getUserById,
  addUser,
  loginUser,
  uploadAvatar,
} from "../controllers/userController.js";
import { upload } from "../config/cloudinaryConfig.js";

const router = express.Router();

// GET
router.get("/get-user/:id", getUserById);

// POST
router.post("/add-user/", addUser);
router.post("/login/", loginUser);

// PUT
router.put("/upload-avatar/:id", uploadAvatar);

export default router;
