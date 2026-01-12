// app/admin/page.tsx
import { Metadata } from "next";
import AdminLayout from "./AdminLayout";
import Product from "@/models/Product";
import mongoose from "mongoose";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Admin Dashboard | Hamid Oil Flour and Dal Mill",
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

export default async function AdminDashboard() {
  const products = await getAllProducts();

  return (
    <AdminLayout>
      <div className="min-h-screen bg-base-200">
        <div className="container mx-auto p-8">
          <h1 className="text-4xl font-bold text-primary mb-8">Admin Dashboard</h1>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Manage Products</h2>
                <p>Add, edit, hide or delete products</p>
                <div className="card-actions justify-end">
                  <Link href="/admin/products/new" className="btn btn-primary">
                    Add New Product
                  </Link>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl opacity-50">
              <div className="card-body">
                <h2 className="card-title">Orders</h2>
                <p>View and manage customer orders</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary" disabled>
                    Coming Soon
                  </button>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl opacity-50">
              <div className="card-body">
                <h2 className="card-title">Users</h2>
                <p>Manage customer accounts</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary" disabled>
                    Coming Soon
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Products Overview */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex justify-between items-center mb-6">
                <h2 className="card-title text-2xl">Products Overview</h2>
                <Link href="/admin/products/new" className="btn btn-sm btn-primary">
                  + Add New
                </Link>
              </div>

              {products.length === 0 ? (
                <div className="alert alert-info">
                  <span>No products added yet. Click &quot;Add New&quot; to start.</span>
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
                          <td>{product.name}</td>
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
                            <div className="flex gap-2">
                              <Link
                                href={`/admin/products/${product._id}/edit`}
                                className="btn btn-xs btn-info"
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
        </div>
      </div>
    </AdminLayout>
  );
}