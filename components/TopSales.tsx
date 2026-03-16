"use client";

import { Product } from "@/lib/api"; // ✅ Use the central type
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

const products: Product[] = [
  {
    id: 1,
    name: "beauty cosmetics", // ✅ Updated from 'title'
    price: 12000,
    image: "/topsales1.jpg",   // ✅ Updated from 'img'
    description: "Premium beauty and skincare essentials.",
  },
  {
    id: 2,
    name: "oraimo power bank",
    price: 8500,
    image: "/topsales2.jpg",
    description: "High-capacity portable charging for your devices.",
  },
  {
    id: 3,
    name: "sliver crease",
    price: 45000,
    image: "/topsales3.jpg",
    description: "Elegant silver-toned fashion piece.",
  },
  {
    id: 4,
    name: "Dubai latest Abaya",
    price: 380000,
    image: "/topsales4.jpg",
    description: "Luxury authentic Dubai Abaya fashion.",
  },
  {
    id: 5,
    name: "Portable Bluetooth Speaker",
    price: 16000,
    image: "/topsales5.jpg",
    description: "Crystal clear sound with long-lasting battery.",
  },
  {
    id: 6,
    name: "LED Ring Light",
    price: 17000,
    image: "/topsales6.jpg",
    description: "Professional lighting for content creators.",
  },
];

export default function TopSales() {
  const { addToCart } = useCart();

  const handleAdd = (product: Product) => {
    addToCart(product); // ✅ Now works perfectly
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <section className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-bold mb-6">Top Sales</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleAdd(product)}
              className="bg-white rounded-md p-2 hover:shadow-lg hover:-translate-y-1 transition duration-300 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-36 object-cover rounded-md"
                />
                <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                  -20%
                </span>
              </div>

              <p className="text-sm mt-2 line-clamp-2">{product.name}</p>
              <p className="text-orange-500 font-bold text-sm mt-1">
                ₦{product.price.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}