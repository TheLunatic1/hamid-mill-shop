// app/api/admin/products/[id]/toggle/route.ts
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Product from "@/models/Product";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }

    await mongoose.connect(process.env.MONGODB_URI!);

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Toggle hidden status
    product.hidden = !product.hidden;
    await product.save();

    return NextResponse.json({ success: true, hidden: product.hidden });
  } catch (error) {
    console.error("Toggle visibility error:", error);
    return NextResponse.json({ error: "Failed to toggle visibility" }, { status: 500 });
  }
}