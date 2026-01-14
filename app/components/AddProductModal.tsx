// app/components/AddProductModal.tsx
"use client";

import React from "react";

export default function AddProductModal() {
  return (
    <dialog id="add-product-modal" className="modal">
      <div className="modal-box max-w-3xl">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        <h3 className="font-bold text-2xl mb-6">Add New Product</h3>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);

            const payload = {
              name: formData.get("name"),
              description: formData.get("description"),
              price: Number(formData.get("price")),
              unit: formData.get("unit"),
              stock: Number(formData.get("stock")),
              imageUrl: formData.get("imageUrl"),
              category: formData.get("category"),
            };

            const res = await fetch("/api/admin/products", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });

            if (res.ok) {
              alert("Product added successfully!");
              (document.getElementById("add-product-modal") as HTMLDialogElement)?.close();
              window.location.reload();
            } else {
              alert("Failed to add product");
            }
          }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">
                <span className="label-text font-medium">Product Name *</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Pure Mustard Oil"
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
                placeholder="220"
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
                placeholder="1 Litre"
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
                placeholder="100"
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
              placeholder="https://..."
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Category</span>
            </label>
            <select name="category" className="select select-bordered w-full" defaultValue="other">
              <option value="oil">Oil</option>
              <option value="flour">Flour</option>
              <option value="dal">Dal</option>
              <option value="grains">Grains</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="modal-action">
            <button type="submit" className="btn btn-primary btn-lg">
              Save Product
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}