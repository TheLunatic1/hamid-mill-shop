// app/admin/page.tsx
import { Metadata } from "next";
import AdminLayout from "./AdminLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Dashboard | Hamid Oil Flour and Dal Mill",
};

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="min-h-screen bg-base-200">
        <div className="container mx-auto p-8">
          <h1 className="text-4xl font-bold text-primary mb-8">Admin Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Manage Products</h2>
                <p>List, add, edit, hide products</p>
                <div className="card-actions justify-end">
                  <Link href="/admin/products" className="btn btn-primary">
                    Go to Products →
                  </Link>
                </div>
              </div>
            </div>

            {/* Future cards: Orders, Users, Analytics */}
            <div className="card bg-base-100 shadow-xl opacity-50">
              <div className="card-body">
                <h2 className="card-title">Orders</h2>
                <p>Coming soon...</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl opacity-50">
              <div className="card-body">
                <h2 className="card-title">Users</h2>
                <p>Coming soon...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}