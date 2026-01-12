// app/products/page.tsx
import { Metadata } from "next";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import Product from "@/models/Product";
import mongoose from "mongoose";
import React from "react";

interface ProductType {
  _id: string;
  name: string;
  price: number;
  unit: string;
  description?: string;
  stock?: number;
  imageUrl?: string;
}

export const metadata: Metadata = {
  title: "Our Products | Hamid Oil Flour and Dal Mill",
  description: "Premium quality mustard oil, atta, dal, and grains directly from the mill",
};

async function getProducts(): Promise<ProductType[]> {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const raw = await Product.find({ hidden: { $ne: true } })
      .sort({ createdAt: -1 })
      .lean();

    return raw.map((doc: any) => ({
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

        {/* Modals */}
        {products.map((product) => (
          <dialog id={`modal-${product._id}`} className="modal modal-bottom sm:modal-middle" key={product._id}>
            <div className="modal-box max-w-2xl">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>

              <div className="grid md:grid-cols-2 gap-8">
                <figure>
                  <Image
                    src={product.imageUrl || "/placeholder.jpg"}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="rounded-xl object-cover w-full aspect-square"
                  />
                </figure>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-primary">{product.name}</h3>
                    <p className="text-2xl font-semibold text-secondary mt-2">
                      ৳{product.price} / {product.unit}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-2">Description</h4>
                    <p className="text-base-content/80">{product.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-2">Stock</h4>
                    <p className="text-sm text-base-content/60">
                      {product.stock} units available
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-2">Payment Options</h4>
                    <ul className="space-y-2 text-base-content/80">
                      <li>• Cash on Delivery (COD)</li>
                      <li>• bKash</li>
                      <li>• Nagad</li>
                      <li>• Bank Transfer / Rocket</li>
                    </ul>
                  </div>

                  <div className="modal-action">
                    <button className="btn btn-primary btn-lg w-full">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </dialog>
        ))}
      </div>
    </div>
  );
}