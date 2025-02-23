import mongoose from "mongoose";
import { Schema } from "mongoose";

const locationSchema = new Schema({
  city: { type: String },
  region: { type: String },
  country: { type: String },
  address: { type: String },
  postal_code: { type: String }
});

const transactionSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  buyer_id: { type: String, required: true },
  seller_id: { type: String, required: true },
  product_id: { type: String, required: true },
  card_id: { type: String, required: true },
  product_name: { type: String, required: true },
  category: { type: String, required: true },
  sale_price: { type: Number, required: true },
  image_url: { type: String, required: true },
  address: locationSchema
}, { timestamps: true });

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
