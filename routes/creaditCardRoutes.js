import express from "express";
import creditCardSchema from "../models/creditCardSchema.js";

const router = express.Router();

// Agregar producto al carrito
router.post("/add", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await creditCardSchema.findOne({ userId });

    if (!cart) {
      cart = new creditCardSchema({ userId, items: [] });
    }

    const productIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex > -1) {
      cart.items[productIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error al agregar al carrito", error });
  }
});

// Obtener carrito
router.get("/:userId", async (req, res) => {
  try {
    const cart = await creditCardSchema
      .findOne({ userId: req.params.userId })
      .populate("items.productId");
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el carrito", error });
  }
});

// Eliminar un producto del carrito
router.delete("/remove", async (req, res) => {
  const { userId, productId } = req.body;

  try {
    let cart = await creditCardSchema.findOne({ userId });

    if (!cart)
      return res.status(404).json({ message: "Carrito no encontrado" });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto", error });
  }
});

export default router;
