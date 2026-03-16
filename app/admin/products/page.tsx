"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { apiRequest, Product } from "@/lib/api";
import toast from "react-hot-toast";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchProducts = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    setIsRefreshing(true);
    
    try {
      // Fetching all products from the plural endpoint
      const response = await apiRequest<any>("/products");

      const productList =
        Array.isArray(response) ? response :
        response.products ? response.products :
        response.data ? response.data :
        [];

      setProducts(productList);
    } catch (err: any) {
      console.error("Fetch error:", err);
      toast.error("Failed to load products.");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (id: string | number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      // Changed method to DELETE to resolve the 405 Method Not Allowed error
      await apiRequest(`/product/delete?id=${id}`, {
        method: "DELETE",
      });

      toast.success("Product removed successfully");
      fetchProducts(true); 
    } catch (err: any) {
      // If DELETE still fails, try changing method to "GET" as a backup for some Go APIs
      toast.error(err.message || "Delete failed");
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-black">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mb-4"></div>
        <p className="font-medium">Loading management console...</p>
      </div>
    );

  return (
    <main className="p-6 max-w-7xl mx-auto text-black">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
          <p className="text-gray-500 text-sm mt-1">
            {products.length} {products.length === 1 ? 'product' : 'products'} found in database
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchProducts(true)}
            disabled={isRefreshing}
            className={`p-2 rounded-lg border hover:bg-gray-100 transition ${isRefreshing ? 'opacity-50 cursor-not-allowed animate-pulse' : ''}`}
            title="Refresh list"
          >
            {isRefreshing ? "⏳" : "🔄"}
          </button>

          <Link
            href="/admin/products/add"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition shadow-sm"
          >
            + Add New Product
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 font-semibold text-gray-700">Image</th>
                <th className="p-4 font-semibold text-gray-700">Product Name</th>
                <th className="p-4 font-semibold text-gray-700">Description</th>
                <th className="p-4 font-semibold text-gray-700">Price</th>
                <th className="p-4 font-semibold text-right text-gray-700">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition">
                  <td className="p-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden border">
                      <img
                        src={product.image?.replace(/['"]+/g, '') || "https://placehold.co/150"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://placehold.co/150";
                        }}
                      />
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-gray-900">{product.name}</td>
                  <td className="p-4 max-w-sm">
                    <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                  </td>
                  <td className="p-4">
                    <span className="text-orange-600 font-bold">
                      ${Number(product.price).toLocaleString()}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/admin/products/edit/${product.id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-semibold"
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

        {products.length === 0 && !isRefreshing && (
          <div className="p-16 text-center">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-gray-900">No products found</h3>
            <p className="text-gray-500">Your inventory is currently empty.</p>
          </div>
        )}
      </div>
    </main>
  );
}