"use client";

import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { useProducts } from "@/context/ProductContext";

export default function ProductsPage() {
  const { products, loading } = useProducts();

  return (
    <main className="px-4 py-10 max-w-7xl mx-auto">

      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-10">All Products</h1>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Empty State */}
      {!loading && products.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No products available.
        </div>
      )}

      {/* Product Grid */}
      {!loading && products.length > 0 && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      )}

    </main>
  );
}
