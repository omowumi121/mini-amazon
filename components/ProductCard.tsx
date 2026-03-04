"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = () => {
    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      addToCart(product);
      toast.success("Added to cart 🛒");
      setLoading(false);
    }, 800);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="border rounded-xl p-4 flex flex-col bg-white shadow-sm hover:shadow-md transition"
    >
      {/* Image */}
      <div className="w-full h-48 mb-4 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain rounded-md"
        />
      </div>

      {/* Info */}
      <h2 className="font-semibold mb-2 text-lg line-clamp-1">
        {product.title}
      </h2>

      <p className="text-gray-500 mb-2 text-sm line-clamp-2">
        {product.description}
      </p>

      <p className="text-xl font-bold mb-2">${product.price}</p>

      <p className="text-yellow-500 mb-4 text-sm">
        Rating: {product.rating} ⭐
      </p>

      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        disabled={loading}
        className={`mt-auto px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-orange-500 hover:bg-orange-600"
        }`}
      >
        {loading ? "Adding..." : "Add to Cart"}
      </button>
    </motion.div>
  );
}
