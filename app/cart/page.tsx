// app/cart/page.tsx
"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { HiTrash } from "react-icons/hi";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, totalPrice, cartCount } = useCart();

  if (cartCount === 0) {
    return (
      <div className="min-h-screen bg-base-200 pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-6">Your Cart is Empty</h1>
          <p className="text-xl text-secondary mb-8">
            Add some fresh products from our mill!
          </p>
          <a href="/products" className="btn btn-primary btn-lg">
            Browse Products
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 pt-24 pb-16">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-primary mb-10 text-center">
          Your Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-6">Cart Items ({cartCount})</h2>

                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b py-4 last:border-b-0"
                  >
                    <div className="avatar">
                      <div className="w-20 rounded">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-secondary">৳{item.price} / {item.unit}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="join">
                        <button
                          className="btn join-item"
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="input input-bordered join-item w-16 text-center"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
                          min={1}
                        />
                        <button
                          className="btn join-item"
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="btn btn-ghost btn-error"
                        onClick={() => removeFromCart(item._id)}
                      >
                        <HiTrash size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl sticky top-24">
              <div className="card-body">
                <h2 className="card-title text-2xl">Order Summary</h2>

                <div className="flex justify-between py-3 border-b">
                  <span>Subtotal ({cartCount} items)</span>
                  <span className="font-semibold">৳{totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between py-3 border-b">
                  <span>Delivery Fee</span>
                  <span className="text-success">TBD</span>
                </div>

                <div className="flex justify-between py-4 text-xl font-bold">
                  <span>Total</span>
                  <span>৳{totalPrice.toFixed(2)}</span>
                </div>

                <button className="btn btn-primary btn-lg w-full">
                  Proceed to Checkout
                </button>

                <p className="text-center text-sm text-base-content/70 mt-4">
                  Prices are final. Delivery charges will be calculated at checkout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}