// app/api/admin/products/[id]/route.ts
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Product from "@/models/Product";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const id = params.id;

    await mongoose.connect(process.env.MONGODB_URI!);

    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

// Optional: if you have edit, add PATCH here too
export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const id = params.id;

    const body = await request.json();

    await mongoose.connect(process.env.MONGODB_URI!);

    const updated = await Product.findByIdAndUpdate(id, body, { new: true });
    if (!updated) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, product: updated });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}