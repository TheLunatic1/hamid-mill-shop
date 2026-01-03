// app/models/User.ts
import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  type: { type: String, enum: ["home", "work", "courier"], required: true },
  address: { type: String, required: true },
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // We'll hash this later
  role: { type: String, enum: ["buyer", "admin"], default: "buyer" },
  addresses: [AddressSchema], // Array of 3 addresses
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);