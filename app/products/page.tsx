"use client";

import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { useProducts } from "@/context/ProductContext";

export default function ProductsPage() {
  const { products, loading } = useProducts();

  return (
    // 1. Color: Using the Amazon light-gray background to make white cards pop
    <main className="min-h-screen bg-[#eaeded] px-2 md:px-4 py-6 md:py-10">
      <div className="max-w-7xl mx-auto">
        
        {/* 2. Text Size & Style: Amazon uses subtle, smaller headings for lists */}
        <div className="bg-white p-4 mb-6 rounded-md shadow-sm border border-gray-200">
           <h1 className="text-xl md:text-2xl font-bold text-[#131921]">
            Results
            <span className="ml-2 text-sm font-normal text-gray-600">
              Check out the latest arrivals
            </span>
          </h1>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-[#febd69] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="text-center py-20 bg-white rounded-md shadow-sm text-gray-500">
            No products available right now.
          </div>
        )}

        {/* 3. The Amazon Grid: 2 columns on mobile, scaling up to 6 on extra-large screens */}
        {!loading && products.length > 0 && (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.05 } },
            }}
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
}