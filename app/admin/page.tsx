// app/products/page.tsx
import { Metadata } from "next";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import Product from "@/models/Product";
import mongoose from "mongoose";
import React from "react";

// Tiny Client Component — only this part has onClick
function ClickableImage({
  product,
}: {
  product: { _id: string; imageUrl?: string; name: string };
}) {
  return (
    <Image
      src={product.imageUrl || "/placeholder.jpg"}
      alt={product.name}
      width={500}
      height={500}
      className="rounded-xl object-cover w-full aspect-square cursor-zoom-in hover:opacity-90 transition-opacity"
      onClick={() => {
        const enlarge = document.getElementById(`enlarge-${product._id}`) as HTMLDialogElement | null;
        if (enlarge) enlarge.showModal();
      }}
    />
  );
}

export const metadata: Metadata = {
  title: "Our Products | Hamid Oil Flour and Dal Mill",
  description: "Premium quality mustard oil, atta, dal, and grains directly from the mill",
};

async function getProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const rawProducts = await Product.find({ hidden: { $ne: true } })
      .sort({ createdAt: -1 })
      .lean();

    return rawProducts.map((doc: any) => ({
      ...doc,
      _id: doc._id.toString(),
      createdAt: doc.createdAt?.toISOString(),
      updatedAt: doc.updatedAt?.toISOString(),
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
          {products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* Modals */}
        {products.map((product: any) => (
          <React.Fragment key={product._id}>
            {/* Description Modal */}
            <dialog id={`modal-${product._id}`} className="modal modal-bottom sm:modal-middle">
              <div className="modal-box max-w-2xl">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>

                <div className="grid md:grid-cols-2 gap-8">
                  <figure>
                    <ClickableImage product={product} />
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
                      <p className="text-base-content/80">{product.description || "No description available."}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-lg mb-2">Stock</h4>
                      <p className="text-sm text-base-content/60">
                        {product.stock || 0} units available
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

                    <div className="modal-action flex flex-col sm:flex-row gap-4 w-full">
                      <div className="join w-full sm:w-auto">
                        <button className="btn join-item">-</button>
                        <input
                          type="number"
                          className="input input-bordered join-item w-20 text-center"
                          defaultValue={1}
                          min={1}
                          max={product.stock || 999}
                        />
                        <button className="btn join-item">+</button>
                      </div>

                      <button className="btn btn-primary flex-1">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>

            {/* Enlarged Image Modal */}
            <dialog id={`enlarge-${product._id}`} className="modal">
              <div className="modal-box p-0 max-w-[95vw] max-h-[95vh] relative">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 z-10 bg-base-100/80">
                    ✕
                  </button>
                </form>

                <Image
                  src={product.imageUrl || "/placeholder.jpg"}
                  alt={`Enlarged view of ${product.name}`}
                  width={1600}
                  height={1600}
                  className="w-full h-auto max-h-[90vh] object-contain rounded-lg transition-transform duration-300 hover:scale-150 cursor-zoom-in"
                  priority
                />
              </div>

              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}