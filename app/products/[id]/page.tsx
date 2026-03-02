"use client";

import { useParams } from "next/navigation";
import { useProducts } from "@/context/ProductContext";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { products } = useProducts();

  const product = products.find((p) => p.id === id);

  if (!product) return <p className="text-center py-20">Product not found</p>;

  return (
    <main className="px-4 py-8 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image */}
        <div className="w-full md:w-1/2 h-96 relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain rounded"
          />
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-500">{product.description}</p>
          <p className="text-xl font-semibold">${product.price}</p>
          <p>Rating: {product.rating} ⭐</p>
          {/* Add to Cart button will come here */}
        </div>
      </div>
    </main>
  );
}
