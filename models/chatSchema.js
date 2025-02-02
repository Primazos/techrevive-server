import mongoose from "mongoose";
import { Schema } from "mongoose";

const chatSchema = new Schema(
  {
    product_id: { type: String, required: true },
    seller_id: { type: String, required: true },
    buyer_id: { type: String, required: true },
  },
  { timestamps: true } // Pongo esto aquí para que mongoose maneje automáticamente los campos createdAt y updatedAt
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
