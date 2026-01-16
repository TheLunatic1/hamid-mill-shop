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
    quantityInput.value = "1";
    const modal = document.getElementById(`modal-${product._id}`) as HTMLDialogElement;
    if (modal) modal.close();
  };

  const adjustQuantity = (product: Product, delta: number) => {
    const input = document.getElementById(`quantity-${product._id}`) as HTMLInputElement | null;
    if (!input) return;

    let value = Number(input.value) || 1;
    value += delta;
    value = Math.max(1, Math.min(product.stock || 999, value));
    input.value = value.toString();
  };

  return (
    <>
      {products.map((product) => (
        <React.Fragment key={product._id}>
          {/* Description Modal */}
          <dialog id={`modal-${product._id}`} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box p-0 max-w-4xl w-full h-[90vh] sm:h-auto overflow-hidden rounded-none sm:rounded-2xl">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10 bg-base-100/80">
                  ✕
                </button>
              </form>

              <div className="flex flex-col sm:flex-row h-full">
                {/* Left: Image – full height, covers perfectly */}
                <div className="w-full sm:w-1/2 h-64 sm:h-auto relative overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    priority
                  />
                </div>

                {/* Right: Content – scrollable */}
                <div className="w-full sm:w-1/2 p-6 sm:p-8 flex flex-col h-full overflow-y-auto">
                  <h3 className="text-3xl font-bold text-primary mb-3">{product.name}</h3>
                  <p className="text-2xl font-semibold text-secondary mb-6">
                    ৳{product.price} / {product.unit}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-lg mb-2">Description</h4>
                    <p className="text-base-content/80 whitespace-pre-line">
                      {product.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-lg mb-2">Stock</h4>
                    <p className="text-sm text-base-content/60">
                      {product.stock} units available
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-lg mb-2">Payment Options</h4>
                    <ul className="space-y-2 text-base-content/80">
                      <li>• Cash on Delivery (COD)</li>
                      <li>• bKash</li>
                      <li>• Nagad</li>
                      <li>• Bank Transfer / Rocket</li>
                    </ul>
                  </div>

                  {/* Fixed Add to Cart section at bottom */}
                  <div className="mt-auto pt-6 border-t sticky bottom-0 bg-base-100 z-10">
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center sm:justify-end">
                      <div className="join w-full sm:w-auto">
                        <button
                          type="button"
                          className="btn join-item"
                          onClick={() => adjustQuantity(product, -1)}
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
                          type="button"
                          className="btn join-item"
                          onClick={() => adjustQuantity(product, 1)}
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="btn btn-primary w-full sm:w-auto flex-1"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
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