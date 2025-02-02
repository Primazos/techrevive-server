import mongoose from "mongoose";
import { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    chat_id: {
      type: mongoose.Schema.Types.ObjectId, // Para hacer referencia al chat
      ref: "Chat", // Relación con el modelo `Chat`
      required: true,
    },
    sender_id: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Uso esto para que mongoose gestione los campos createdAt y updatedAt automáticamente
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
