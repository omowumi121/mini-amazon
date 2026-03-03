// app/admin/layout.tsx
"use client";

import Link from "next/link";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProtectedRoute>
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <aside className="w-64 bg-black text-white p-6">
          <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
          <nav className="flex flex-col gap-4">
            <Link href="/admin" className="hover:text-orange-500">Dashboard</Link>
            <Link href="/admin/products" className="hover:text-orange-500">Products</Link>
            <Link href="/admin/orders" className="hover:text-orange-500">Orders</Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8 bg-gray-100">{children}</main>
      </div>
    </AdminProtectedRoute>
  );
}
