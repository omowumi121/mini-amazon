"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      addToCart(product);
      toast.success(`${product.name} added to cart 🛒`);
      setLoading(false);
    }, 500);
  };

  const ratingValue =
    typeof product.rating === "object"
      ? product.rating?.rate
      : product.rating;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="border rounded-xl p-4 flex flex-col bg-white shadow-sm hover:shadow-lg transition h-full"
    >
      <Link
        href={`/products/${product.id}`}
        className="flex flex-col flex-1 group cursor-pointer"
      >
        {/* Image */}
        <div className="w-full h-44 mb-4 flex items-center justify-center overflow-hidden bg-gray-50 rounded-lg">
          <img
            src={product.image || "/placeholder.png"}
            alt={product.name}
            className="w-full h-full object-contain p-3 group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Category */}
        {product.category && (
          <span className="text-xs text-orange-600 font-semibold uppercase tracking-wide mb-1">
            {product.category}
          </span>
        )}

        {/* Name */}
        <h2 className="font-semibold mb-1 text-gray-800 text-base line-clamp-1 group-hover:text-orange-600 transition-colors">
          {product.name}
        </h2>

        {/* Description */}
        <p className="text-gray-500 mb-3 text-sm line-clamp-2">
          {product.description}
        </p>

        {/* Price + Rating */}
        <div className="flex justify-between items-center mb-3">
          <p className="text-lg font-bold text-orange-600">
            ₦{Number(product.price).toLocaleString()}
          </p>

          {ratingValue && (
            <span className="text-yellow-500 text-sm font-medium">
              {ratingValue} ⭐
            </span>
          )}
        </div>
      </Link>

      {/* Add To Cart */}
      <button
        onClick={handleAddToCart}
        disabled={loading}
        className={`mt-auto px-4 py-2 rounded-lg text-white font-medium text-sm transition-all duration-300 ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-orange-500 hover:bg-orange-600 active:scale-95"
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Adding...
          </span>
        ) : (
          "Add to Cart"
        )}
      </button>
    </motion.div>
  );
}
