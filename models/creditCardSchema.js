import mongoose from "mongoose";
import { Schema } from "mongoose";

const creditCardSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  card_number: {
    type: String,
    required: true,
    unique: true,
  },
  expiration_date: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  is_default: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const CreditCard = mongoose.model("CreditCard", creditCardSchema);

export default CreditCard;
