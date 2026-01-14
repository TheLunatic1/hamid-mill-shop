// app/api/admin/products/[id]/toggle/route.ts
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Product from "@/models/Product";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }  // ← correct type with Promise (Next.js 15)
) {
  try {
    const params = await context.params;  // ← await it (important in Next.js 15)
    const id = params.id;

    console.log("Toggle request received for ID:", id);

    if (!id) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }

    await mongoose.connect(process.env.MONGODB_URI!);

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    product.hidden = !product.hidden;
    await product.save();

    return NextResponse.json({ success: true, hidden: product.hidden });
  } catch (error) {
    console.error("Toggle visibility error:", error);
    return NextResponse.json({ error: "Failed to toggle visibility" }, { status: 500 });
  }
}