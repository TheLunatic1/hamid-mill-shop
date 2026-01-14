// app/components/AdminProductTable.tsx
"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import EditProductModal from "@/components/EditProductModal";

interface Product {
  _id: string;
  name: string;
  price: number;
  unit: string;
  stock: number;
  hidden: boolean;
  imageUrl?: string;
  description?: string;
  category?: string;
}

interface Props {
  products: Product[];
}

export default function AdminProductTable({ products }: Props) {
  const router = useRouter();

  const handleToggle = async (id: string, isHidden: boolean) => {
    const action = isHidden ? "show" : "hide";
    if (!confirm(`Are you sure you want to ${action} this product?`)) return;

    try {
      const res = await fetch(`/api/admin/products/${id}/toggle`, {
        method: "POST",
        headers: { "Cache-Control": "no-cache" },
        cache: "no-store", // prevent caching
      });

      if (res.ok) {
        router.refresh(); // refresh server data
        router.replace(router.asPath, { scroll: false }); // refresh client components
      } else {
        alert("Failed to update visibility");
      }
    } catch {
      alert("Network error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product? This cannot be undone.")) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
        headers: { "Cache-Control": "no-cache" },
        cache: "no-store", // prevent caching
      });

      if (res.ok) {
        router.refresh();
      } else {
        alert("Failed to delete product");
      }
    } catch {
      alert("Network error");
    }
  };

  return (
    <>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra table-compact w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Unit</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  {product.imageUrl ? (
                    <div className="avatar">
                      <div className="w-12 rounded">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ) : (
                    <span className="text-2xl">🌾</span>
                  )}
                </td>
                <td className="font-medium">{product.name}</td>
                <td>৳{product.price}</td>
                <td>{product.unit}</td>
                <td>{product.stock}</td>
                <td>
                  {product.hidden ? (
                    <div className="badge badge-error">Hidden</div>
                  ) : (
                    <div className="badge badge-success">Visible</div>
                  )}
                </td>
                <td>
                  <div className="flex flex-wrap gap-2">
                    <button
                      className="btn btn-xs btn-info"
                      onClick={() => {
                        const modal = document.getElementById(`edit-${product._id}`) as HTMLDialogElement | null;
                        if (modal) modal.showModal();
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className={`btn btn-xs ${product.hidden ? "btn-success" : "btn-warning"}`}
                      onClick={() => handleToggle(product._id, product.hidden)}
                    >
                      {product.hidden ? "Show" : "Hide"}
                    </button>

                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modals – outside table */}
      {products.map((product) => (
        <EditProductModal key={product._id} product={product} />
      ))}
    </>
  );
}