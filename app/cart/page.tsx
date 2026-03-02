"use client";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const handleCheckout = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    router.push("/checkout");
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price,
    0
  );

  if (cartItems.length === 0) {
    return (
      <main className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500 text-lg">Your cart is empty 🛒</p>
      </main>
    );
  }

  return (
    <main className="px-4 py-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="flex flex-col gap-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-6 border p-4 rounded-lg shadow-sm"
          >
            {/* Image */}
            <div className="relative w-24 h-24">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain"
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <h2 className="font-semibold text-lg">{item.title}</h2>
              <p className="text-gray-600">${item.price}</p>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-700 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <div className="mt-10 border-t pt-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          Total: ${totalPrice.toFixed(2)}
        </h2>

        <div className="flex gap-4">
          <button
            onClick={clearCart}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Clear Cart
          </button>

          <button
            onClick={handleCheckout}
            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </main>
  );
}
