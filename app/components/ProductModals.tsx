// app/components/ProductModals.tsx
"use client";

import Image from "next/image";
import React from "react";
import { useCart } from "@/context/CartContext";

type Product = {
  _id: string;
  name: string;
  price: number;
  unit: string;
  description: string;
  stock: number;
  imageUrl: string;
};

type Props = {
  products: Product[];
};

export default function ProductModals({ products }: Props) {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    const quantityInput = document.getElementById(`quantity-${product._id}`) as HTMLInputElement | null;
    if (!quantityInput) return;

    const quantity = Number(quantityInput.value);
    if (isNaN(quantity) || quantity < 1 || quantity > product.stock) {
      alert(`Please enter a quantity between 1 and ${product.stock}`);
      return;
    }

    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      imageUrl: product.imageUrl,
      quantity,
    });

    alert(`${quantity} × ${product.name} added to cart!`);
    quantityInput.value = "1"; // reset
    const modal = document.getElementById(`modal-${product._id}`) as HTMLDialogElement;
    if (modal) modal.close();
  };

  const adjustQuantity = (productId: string, delta: number) => {
    const input = document.getElementById(`quantity-${productId}`) as HTMLInputElement | null;
    if (!input) return;

    const current = Number(input.value) || 1;
    const newValue = Math.max(1, Math.min(input.max ? Number(input.max) : 999, current + delta));
    input.value = newValue.toString();
  };

  return (
    <>
      {products.map((product) => (
        <React.Fragment key={product._id}>
          {/* Description Modal */}
          <dialog id={`modal-${product._id}`} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box max-w-2xl">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>

              <div className="grid md:grid-cols-2 gap-8">
                <figure>
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="rounded-xl object-cover w-full aspect-square cursor-zoom-in hover:opacity-90 transition-opacity"
                    onClick={() => {
                      const enlargeModal = document.getElementById(`enlarge-${product._id}`) as HTMLDialogElement;
                      if (enlargeModal) enlargeModal.showModal();
                    }}
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

                  {/* Cart Controls */}
                  <div className="modal-action flex flex-col sm:flex-row gap-4 w-full">
                    <div className="join w-full sm:w-auto">
                      <button
                        className="btn join-item"
                        onClick={() => adjustQuantity(product._id, -1)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        id={`quantity-${product._id}`}
                        className="input input-bordered join-item w-20 text-center"
                        defaultValue={1}
                        min={1}
                        max={product.stock}
                      />
                      <button
                        className="btn join-item"
                        onClick={() => adjustQuantity(product._id, 1)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="btn btn-primary flex-1"
                      onClick={() => handleAddToCart(product)}
                    >
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
                src={product.imageUrl}
                alt={`Enlarged view of ${product.name}`}
                width={1600}
                height={1600}
                className="w-full h-auto max-h-[90vh] object-contain rounded-lg cursor-zoom-in"
                priority
              />
            </div>

            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </React.Fragment>
      ))}
    </>
  );
}