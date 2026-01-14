// app/api/admin/products/[id]/toggle/route.ts
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Product from "@/models/Product";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const id = params.id;

    await mongoose.connect(process.env.MONGODB_URI!);

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    product.hidden = !product.hidden;
    await product.save();

    return NextResponse.json({ success: true, hidden: product.hidden });
  } catch (error) {
    console.error("Toggle error:", error);
    return NextResponse.json({ error: "Failed to toggle" }, { status: 500 });
  }
}