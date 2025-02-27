import Chat from "../models/chatSchema.js";
import User from "../models/userSchema.js";
import chalk from "chalk";

// GET
export const getChatById = async (req, res) => {
  try {
    const chatId = req.params.id;
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ message: "Chat no encontrado" });
    }

    res.json(chat);
  } catch (error) {
    console.error(chalk.red("Error al obtener el chat:", error));
    res.status(500).json({ message: "Error al obtener el chat", error });
  }
};

export const getChatsByProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const chats = await Chat.find({ product_id: productId });

    if (!chats.length) {
      return res
        .status(404)
        .json({ message: "No hay chats para este producto" });
    }

    res.json(chats);
  } catch (error) {
    console.error(chalk.red("Error al obtener los chats del producto:", error));
    res
      .status(500)
      .json({ message: "Error al obtener los chats del producto", error });
  }
};

export const getChatsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const chats = await Chat.find({
      $or: [{ seller_id: userId }, { buyer_id: userId }],
    });

    if (!chats.length) {
      return res
        .status(404)
        .json({ message: "No hay chats para este usuario" });
    }

    res.json(chats);
  } catch (error) {
    console.error(chalk.red("Error al obtener los chats del usuario:", error));
    res
      .status(500)
      .json({ message: "Error al obtener los chats del usuario", error });
  }
};

// POST
export const createChat = async (req, res) => {
  try {
    const { product_id, seller_id, buyer_id } = req.body;

    const seller = await User.findById(seller_id).select("username");
    const buyer = await User.findById(buyer_id).select("username");

    if (!seller || !buyer) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const newChat = new Chat({
      product_id,
      seller_id,
      buyer_id,
      seller_username: seller.username,
      buyer_username: buyer.username,
    });

    const savedChat = await newChat.save();
    console.log(chalk.green("Chat creado:", savedChat._id));

    res.status(201).json(savedChat);
  } catch (error) {
    console.error(chalk.red("Error al crear el chat:", error));
    res.status(500).json({ message: "Error al crear el chat", error });
  }
};

// DELETE
export const deleteChat = async (req, res) => {
  try {
    const chatId = req.params.id;
    const deletedChat = await Chat.findByIdAndDelete(chatId);

    if (!deletedChat) {
      return res.status(404).json({ message: "Chat no encontrado" });
    }

    res.json(deletedChat);
  } catch (error) {
    console.error(chalk.red("Error al eliminar el chat:", error));
    res.status(500).json({ message: "Error al eliminar el chat", error });
  }
};
