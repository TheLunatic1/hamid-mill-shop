// app/actions/productActions.ts
"use server";

import mongoose from "mongoose";
import Product from "@/models/Product";
import { redirect } from "next/navigation";

export interface ProductFormState {
  error?: string;
  success?: boolean;
  message?: string;
}

export async function createProductAction(
  prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const data = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    price: Number(formData.get("price")),
    unit: formData.get("unit") as string,
    stock: Number(formData.get("stock")),
    imageUrl: (formData.get("imageUrl") as string) || undefined,
    category: (formData.get("category") as string) || "other",
    hidden: false, // new products visible by default
  };

  // Basic validation
  if (!data.name || !data.description || !data.price || !data.unit || !data.stock) {
    return { error: "Please fill all required fields" };
  }

  if (isNaN(data.price) || data.price <= 0) {
    return { error: "Price must be a positive number" };
  }

  if (isNaN(data.stock) || data.stock < 0) {
    return { error: "Stock must be a non-negative number" };
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    await Product.create(data);

    return { success: true, message: "Product added successfully!" };
  } catch (error) {
    console.error("Create product error:", error);
    return { error: "Failed to add product. Please try again." };
  }
}