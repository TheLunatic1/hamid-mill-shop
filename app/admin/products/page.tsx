// app/admin/products/page.tsx
import { Metadata } from "next";
import AdminLayout from "../AdminLayout";
import Product from "@/models/Product";
import mongoose from "mongoose";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Manage Products | Admin Dashboard",
};

interface ProductType {
  _id: string;
  name: string;
  price: number;
  unit: string;
  stock: number;
  hidden: boolean;
  imageUrl?: string;
}

async function getAllProducts(): Promise<ProductType[]> {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const raw = await Product.find({})
      .sort({ createdAt: -1 })
      .lean();

    return raw.map((doc) => ({
      _id: doc._id.toString(),
      name: doc.name,
      price: doc.price,
      unit: doc.unit,
      stock: doc.stock,
      hidden: doc.hidden,
      imageUrl: doc.imageUrl,
    }));
  } catch (error) {
    console.error("Admin products fetch error:", error);
    return [];
  }
}

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <AdminLayout>
      <div className="min-h-screen bg-base-200 pt-20">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h1 className="text-4xl font-bold text-primary">Manage Products</h1>
              <p className="text-lg text-base-content/70 mt-2">
                Add, edit, hide or delete products visible to customers
              </p>
            </div>

            <Link href="/admin/products/new" className="btn btn-primary btn-lg">
              + Add New Product
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="alert alert-info shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>No products yet. Add your first item!</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
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
                            <div className="w-16 rounded">
                              <Image
                                src={product.imageUrl}
                                alt={product.name}
                                width={64}
                                height={64}
                                className="object-cover"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="avatar placeholder">
                            <div className="bg-neutral-focus text-neutral-content rounded w-16">
                              <span className="text-xl">🌾</span>
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="font-medium">{product.name}</td>
                      <td>৳{product.price}</td>
                      <td>{product.unit}</td>
                      <td>{product.stock}</td>
                      <td>
                        {product.hidden ? (
                          <div className="badge badge-error gap-2">Hidden</div>
                        ) : (
                          <div className="badge badge-success gap-2">Visible</div>
                        )}
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <Link
                            href={`/admin/products/${product._id}/edit`}
                            className="btn btn-sm btn-outline btn-info"
                          >
                            Edit
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}