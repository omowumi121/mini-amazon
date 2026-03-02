"use client";

import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { useProducts } from "@/context/ProductContext";
import { products } from "@/data/products";


export default function ProductsPage() {
  const { products } = useProducts();

  return (
    <main className="px-4 py-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">All Products</h1>

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
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}
