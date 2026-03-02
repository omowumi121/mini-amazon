"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <aside className="w-64 bg-black text-white p-6">
          <h2 className="text-xl font-bold mb-6">Admin</h2>

          <nav className="flex flex-col gap-4">
            <Link href="/admin">Dashboard</Link>
            <Link href="/admin/products">Products</Link>
            <Link href="/admin/orders">Orders</Link>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-8 bg-gray-100">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
