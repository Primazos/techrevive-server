import Message from "../models/messageSchema.js";
import chalk from "chalk";

// GET
export const getMessagesByChat = async (req, res) => {
  try {
    const chatId = req.params.chatId;

    const messages = await Message.find({ chat_id: chatId }).sort({ createdAt: 1 });


    if (!messages.length) {
      return res.status(404).json({ message: "No hay mensajes en este chat" });
    }

    res.json(messages);
  } catch (error) {
    console.error(chalk.red("Error al obtener los mensajes del chat:", error));
    res
      .status(500)
      .json({ message: "Error al obtener los mensajes del chat", error });
  }
};

// POST
export const createMessage = async (req, res) => {
  try {
    const { chat_id, sender_id, content } = req.body;

    const newMessage = new Message({
      chat_id,
      sender_id,
      content,
    });

    const savedMessage = await newMessage.save();
    console.log(chalk.green("Mensaje creado:", savedMessage._id));

    res.status(201).json(savedMessage);
  } catch (error) {
    console.error(chalk.red("Error al crear el mensaje:", error));
    res.status(500).json({ message: "Error al crear el mensaje", error });
  }
};

// DELETE
export const deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    const deletedMessage = await Message.findByIdAndDelete(messageId);

    if (!deletedMessage) {
      return res.status(404).json({ message: "Mensaje no encontrado" });
    }

    res.json(deletedMessage);
  } catch (error) {
    console.error(chalk.red("Error al eliminar el mensaje:", error));
    res.status(500).json({ message: "Error al eliminar el mensaje", error });
  }
};

export const deleteAllMessages = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const deletedMessages = await Message.deleteMany({ chat_id: chatId });

    if (!deletedMessages) {
      return res.status(404).json({ message: "No hay mensajes para eliminar" });
    }

    res.json(deletedMessages);
  } catch (error) {
    console.error(chalk.red("Error al eliminar todos los mensajes:", error));
    res
      .status(500)
      .json({ message: "Error al eliminar todos los mensajes", error });
  }
};