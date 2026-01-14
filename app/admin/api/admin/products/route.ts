// app/api/admin/products/route.ts
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Product from "@/models/Product";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("Received add product payload:", body); // ← for debugging in Vercel logs

    // Basic validation
    if (!body.name || !body.unit || !body.price || !body.stock) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await mongoose.connect(process.env.MONGODB_URI!);

    const newProduct = await Product.create({
      name: body.name,
      description: body.description || "",
      price: Number(body.price),
      unit: body.unit,
      stock: Number(body.stock),
      imageUrl: body.imageUrl || undefined,
      category: body.category || "other",
      hidden: false,
    });

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error) {
    console.error("Create product API error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}