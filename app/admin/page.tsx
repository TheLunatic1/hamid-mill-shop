// app/admin/page.tsx
import { Metadata } from "next";
import AdminLayout from "./AdminLayout";
import Product from "@/models/Product";
import mongoose from "mongoose";
import AdminProductTable from "@/components/AdminProductTable";
import AddProductButton from "@/components/AddProductButton";
import AddProductModal from "@/components/AddProductModal";

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

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Total Products</h2>
                <p className="text-4xl font-bold text-primary">{products.length}</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl opacity-50">
              <div className="card-body">
                <h2 className="card-title">Active Orders</h2>
                <p className="text-4xl font-bold text-secondary">0</p>
                <p className="text-sm opacity-70">Coming soon</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl opacity-50">
              <div className="card-body">
                <h2 className="card-title">Revenue</h2>
                <p className="text-4xl font-bold text-accent">৳0</p>
                <p className="text-sm opacity-70">Coming soon</p>
              </div>
            </div>
          </div>

          {/* Product Management */}
          <div className="card bg-base-100 shadow-2xl">
            <div className="card-body">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="card-title text-2xl">Product Management</h2>

                <AddProductButton />
              </div>

              {products.length === 0 ? (
                <div className="alert alert-info">
                  <span>No products yet. Click &quot;Add New Product&quot; to start.</span>
                </div>
              ) : (
                <AdminProductTable products={products} />
              )}
            </div>
          </div>

          {/* Modal is now in client component */}
          <AddProductModal />
        </div>
      </div>
    </AdminLayout>
  );
}