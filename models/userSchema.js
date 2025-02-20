import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  city: { type: String },
  region: { type: String },
  country: { type: String },
});

const userSchema = new mongoose.Schema({
  _id: { type: String, default: () => new mongoose.Types.ObjectId() },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar_img: { type: String },
  gender: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  location: { type: locationSchema },
});

const User = mongoose.model("User", userSchema);

export default User;
