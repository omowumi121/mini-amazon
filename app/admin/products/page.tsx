"use client";

import Link from "next/link";
import { useProducts } from "@/context/ProductContext";

export default function AdminProducts() {
  const { products, deleteProduct } = useProducts();

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <Link
          href="/admin/products/add"
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="p-2 border">{product.title}</td>
                <td className="p-2 border">${product.price}</td>
                <td className="p-2 border flex gap-3">
                  <Link
                    href={`/admin/products/edit/${product.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
