import mongoose from "mongoose";
import { Schema } from "mongoose";

const chatSchema = new Schema(
  {
    product_id: { type: String, required: true },
    seller_id: { type: String, required: true },
    buyer_id: { type: String, required: true },
    seller_username: { type: String, required: true },
    buyer_username: { type: String, required: true },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
