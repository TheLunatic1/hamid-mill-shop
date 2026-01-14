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

    // ← Add cache-control headers here
    return NextResponse.json(
      { success: true, hidden: product.hidden },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
          "Pragma": "no-cache",
          "Expires": "0",
          "Surrogate-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("Toggle visibility error:", error);
    return NextResponse.json({ error: "Failed to toggle visibility" }, { status: 500 });
  }
}