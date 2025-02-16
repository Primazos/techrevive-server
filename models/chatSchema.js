import mongoose from "mongoose";
import { Schema } from "mongoose";

const chatSchema = new Schema(
  {
    product_id: { type: String, required: true },
    seller_id: { type: String, required: true },
    buyer_id: { type: String, required: true },
    seller_username: { type: String, required: true }, // Añadido el campo seller_username
    buyer_username: { type: String, required: true },   // Añadido el campo buyer_username
  },
  { timestamps: true } // Para que mongoose maneje automáticamente los campos createdAt y updatedAt
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
