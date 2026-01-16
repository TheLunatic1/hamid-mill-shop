// app/products/page.tsx
import { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import Product from "@/models/Product";
import mongoose from "mongoose";
import React from "react";
import ProductModals from "@/components/ProductModals";

export const metadata: Metadata = {
  title: "Our Products | Hamid Oil Flour and Dal Mill",
  description: "Premium quality mustard oil, atta, dal, and grains directly from the mill",
};

export const revalidate = 0;

async function getProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const rawProducts = await Product.find({ hidden: { $ne: true } })
      .sort({ createdAt: -1 })
      .lean();

    return rawProducts.map((doc) => ({
      _id: doc._id.toString(),
      name: doc.name,
      price: doc.price,
      unit: doc.unit,
      description: doc.description,
      stock: doc.stock,
      imageUrl: doc.imageUrl,
    }));
  } catch (error) {
    console.error("Products fetch error:", error);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-base-200 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-primary mb-6">Products Coming Soon!</h1>
          <p className="text-xl text-secondary">Admin is adding fresh items right now</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 pt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary mb-4">
            Our Premium Products
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Pure, fresh mustard oil, whole wheat atta, moong dal, chana dal and more – 
            directly from Hamid Oil Flour and Dal Mill to your kitchen.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <ProductModals products={products} />
      </div>
    </div>
  );
}