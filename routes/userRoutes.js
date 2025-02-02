import express from "express";
import { getUserById, addUser } from "../controllers/userController.js";

const router = express.Router();

// GET
router.get("/get-user/:id", getUserById);

// POST
router.post("/add-user/", addUser);

export default router;
