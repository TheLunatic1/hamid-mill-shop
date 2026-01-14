// app/api/admin/products/[id]/route.ts
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Product from "@/models/Product";

// PATCH: Update product (for edit)
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }

    await mongoose.connect(process.env.MONGODB_URI!);

    const updated = await Product.findByIdAndUpdate(id, body, { new: true, runValidators: true });

    if (!updated) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, product: updated });
  } catch (error) {
    console.error("Update product error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// DELETE: Delete product (already working, but confirm)
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }

    await mongoose.connect(process.env.MONGODB_URI!);

    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete product error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}