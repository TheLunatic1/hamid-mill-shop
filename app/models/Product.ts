// app/models/Product.ts
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }, // in rupees or your currency
  unit: { type: String, required: true }, // e.g., "1kg", "5L", "500g"
  category: { 
    type: String, 
    enum: ["oil", "flour", "dal", "grains", "other"], 
    default: "other" 
  },
  imageUrl: { type: String }, // optional product image
  stock: { type: Number, default: 100 },
  hidden: { type: Boolean, default: false }, // admin can hide from buyers
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);