"use client";

import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="border rounded-md p-4 flex flex-col bg-white shadow-sm"
    >
      {/* Image */}
      <div className="w-full h-48 mb-4 flex items-center justify-center relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain rounded"
        />
      </div>

      {/* Info */}
      <h2 className="font-semibold mb-2 text-lg">{product.title}</h2>
      <p className="text-gray-500 mb-2 text-sm">{product.description}</p>
      <p className="text-xl font-bold mb-2">${product.price}</p>
      <p className="text-yellow-500 mb-4">Rating: {product.rating} ⭐</p>

      {/* Add to Cart */}
      <button
        onClick={() => addToCart(product)}
        className="mt-auto bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
      >
        Add to Cart
      </button>
    </motion.div>
  );
}
