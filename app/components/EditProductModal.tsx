// app/components/EditProductModal.tsx
"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Product = {
  _id: string;
  name: string;
  price: number;
  unit: string;
  stock: number;
  description?: string;
  imageUrl?: string;
  category?: string;
  hidden: boolean;
};

type Props = {
  product: Product;
};

export default function EditProductModal({ product }: Props) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: product.name || "",
    price: product.price || 0,
    unit: product.unit || "",
    stock: product.stock || 0,
    description: product.description || "",
    imageUrl: product.imageUrl || "",
    category: product.category || "other",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/admin/products/${product._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Product updated successfully!");
        (document.getElementById(`edit-${product._id}`) as HTMLDialogElement)?.close();
        router.refresh();
      } else {
        alert("Failed to update product");
      }
    } catch {
      alert("Network error");
    }
  };

  return (
    <dialog id={`edit-${product._id}`} className="modal">
      <div className="modal-box max-w-3xl">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        <h3 className="font-bold text-2xl mb-6">Edit Product: {product.name}</h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">
                <span className="label-text font-medium">Product Name *</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Price (৳) *</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="input input-bordered w-full"
                min="1"
                step="1"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Unit (e.g. 1 Litre) *</span>
              </label>
              <input
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Stock Quantity *</span>
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="input input-bordered w-full"
                min="0"
                required
              />
            </div>
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Description</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Detailed description..."
              className="textarea textarea-bordered w-full h-24"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Image URL (optional)</span>
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Category</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="oil">Oil</option>
              <option value="flour">Flour</option>
              <option value="dal">Dal</option>
              <option value="grains">Grains</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="modal-action">
            <button type="submit" className="btn btn-primary btn-lg">
              Update Product
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}