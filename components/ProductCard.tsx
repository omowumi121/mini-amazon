"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Added Next.js Image import
import { Product } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";

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
      toast.success(`${product.name} added to cart`);
      setLoading(false);
    }, 400);
  };

  const ratingValue = typeof product.rating === "object" ? product.rating?.rate : product.rating;

  return (
    <motion.div
      className="group bg-white flex flex-col h-full border border-gray-200 hover:border-orange-300 transition-colors duration-200 overflow-hidden"
    >
      <Link href={`/products/${product.id}`} className="flex flex-col flex-1 p-3">
        
        {/* Optimized Image: Centered on light gray/white background */}
        <div className="relative w-full h-40 md:h-48 mb-3 bg-[#f7f7f7] rounded-sm overflow-hidden">
          <Image
            src={product.image || "/placeholder.png"}
            alt={product.name}
            fill
            // Performance Fix: Specific sizes for the grid to prevent downloading huge files
            sizes="(max-width: 768px) 45vw, (max-width: 1200px) 20vw, 200px"
            className="object-contain p-2 mix-blend-multiply group-hover:scale-105 transition-all duration-300"
            quality={75} 
          />
        </div>

        {/* Name */}
        <h2 className="text-[#0F1111] text-sm md:text-base font-medium mb-1 line-clamp-2 leading-tight group-hover:text-[#C7511F]">
          {product.name}
        </h2>

        {/* Rating Section */}
        <div className="flex items-center gap-1 mb-1">
          <div className="flex text-[#FFA41C] text-xs">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={i < Math.floor(ratingValue || 0) ? "fill-current" : "text-gray-300"} />
            ))}
          </div>
          <span className="text-[#007185] text-xs hover:text-orange-600 transition-colors">
            {ratingValue || 0}
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto pt-2">
          <div className="flex items-start text-[#0F1111]">
            <span className="text-xs font-medium mt-0.5">₦</span>
            <span className="text-xl font-bold leading-none">
              {Math.floor(Number(product.price)).toLocaleString()}
            </span>
            <span className="text-xs font-medium">.00</span>
          </div>
          
          <div className="flex items-center gap-1 mt-1">
            <span className="text-[#007185] text-[10px] font-bold">FREE Delivery</span>
            <span className="text-gray-500 text-[10px]">by Besty's</span>
          </div>
        </div>
      </Link>

      {/* Amazon Style Button */}
      <div className="p-3 pt-0">
        <button
          onClick={handleAddToCart}
          disabled={loading}
          className={`w-full py-1.5 rounded-full text-xs font-medium shadow-sm border transition-all duration-200 ${
            loading
              ? "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-b from-[#ffd814] to-[#f7ca00] border-[#F2C200] hover:from-[#f7dfa5] hover:to-[#f0c14b] active:shadow-inner text-black"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-3 h-3 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></span>
              Working...
            </span>
          ) : (
            "Add to Cart"
          )}
        </button>
      </div>
    </motion.div>
  );
}