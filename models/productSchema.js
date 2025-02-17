import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  _id: { type: String, default: () => new mongoose.Types.ObjectId() }, // Generar _id automáticamente
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  price: { type: Number, required: true },
  image_urls: { type: [String] },
  sold: { type: Boolean, default: false },
  user_id: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
