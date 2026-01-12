// app/admin/products/new/page.tsx
"use client";

import { useActionState } from "react";
import { createProductAction, ProductFormState } from "@/actions/productActions";
import AdminLayout from "../../AdminLayout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NewProductPage() {
  const [state, formAction, isPending] = useActionState<ProductFormState, FormData>(
    createProductAction,
    { error: undefined }
  );

  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      // Small delay to show success message, then redirect
      const timer = setTimeout(() => {
        router.push("/admin");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [state?.success, router]);

  return (
    <AdminLayout>
      <div className="min-h-screen bg-base-200 pt-20">
        <div className="container mx-auto px-6 py-12 max-w-3xl">
          <h1 className="text-4xl font-bold text-primary mb-8">Add New Product</h1>

          {/* Feedback messages */}
          {state?.error && (
            <div className="alert alert-error mb-6">
              <span>{state.error}</span>
            </div>
          )}

          {state?.success && (
            <div className="alert alert-success mb-6">
              <span>{state.message || "Product added successfully! Redirecting..."}</span>
            </div>
          )}

          <form action={formAction} className="space-y-6">
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Product Name *</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Pure Mustard Oil"
                className="input input-bordered w-full"
                required
                disabled={isPending}
              />
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Description *</span>
              </label>
              <textarea
                name="description"
                placeholder="Detailed product description..."
                className="textarea textarea-bordered h-32 w-full"
                required
                disabled={isPending}
              />
            </div>

            {/* Price & Unit */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
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
                  disabled={isPending}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Unit (e.g. 1 Litre, 5 Kg) *</span>
                </label>
                <input
                  type="text"
                  name="unit"
                  placeholder="1 Litre"
                  className="input input-bordered w-full"
                  required
                  disabled={isPending}
                />
              </div>
            </div>

            {/* Stock */}
            <div className="form-control">
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
                disabled={isPending}
              />
            </div>

            {/* Image URL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Image URL (optional)</span>
              </label>
              <input
                type="url"
                name="imageUrl"
                placeholder="https://example.com/product.jpg"
                className="input input-bordered w-full"
                disabled={isPending}
              />
            </div>

            {/* Category */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Category</span>
              </label>
              <select
                name="category"
                className="select select-bordered w-full"
                defaultValue="other"
                disabled={isPending}
              >
                <option value="oil">Oil</option>
                <option value="flour">Flour</option>
                <option value="dal">Dal</option>
                <option value="grains">Grains</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-10">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => router.back()}
                disabled={isPending}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Saving...
                  </>
                ) : (
                  "Save Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}