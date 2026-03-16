"use client";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    increaseQty,
    decreaseQty,
  } = useCart();

  const { token } = useAuth();
  const router = useRouter();

  const handleCheckout = () => {
    if (!token) {
      router.push("/login");
      return;
    }
    router.push("/checkout");
  };

  // Subtotal calculation - using item.name instead of item.title
  const subtotal = cartItems.reduce(
    (total, item) => total + (Number(item.price) * item.quantity),
    0
  );

  // Updated logic to match Naira formatting
  const deliveryFee = subtotal > 5000 ? 0 : 500;
  const total = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[60vh] text-black">
        <p className="text-6xl mb-4">🛒</p>
        <p className="text-gray-500 text-lg">Your cart is empty</p>
        <button 
          onClick={() => router.push("/")}
          className="mt-4 text-orange-500 font-bold hover:underline"
        >
          Go Shopping
        </button>
      </main>
    );
  }

  return (
    <main className="px-4 py-8 max-w-6xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* CART ITEMS */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-6 border p-4 rounded-xl shadow-sm bg-white"
            >
              {/* Image with Sanitization */}
              <div className="relative w-24 h-24 bg-gray-50 rounded-lg overflow-hidden border">
                <Image
                  src={item.image?.replace(/['"]+/g, '') || "https://placehold.co/100"}
                  alt={item.name} // Changed from item.title to item.name
                  fill
                  className="object-contain p-2"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="font-bold text-lg text-gray-900">
                    {item.name} {/* Changed from item.title to item.name */}
                  </h2>
                  <p className="text-orange-600 font-bold">
                    ₦{Number(item.price).toLocaleString()}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => decreaseQty(item.id as string)}
                    className="bg-gray-100 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
                  >
                    -
                  </button>
                  <span className="font-bold w-4 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQty(item.id as string)}
                    className="bg-gray-100 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Remove */}
              <div className="flex items-start">
                <button
                  onClick={() => removeFromCart(item.id as string)}
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  <span className="text-sm font-medium">Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ORDER SUMMARY */}
        <div className="border p-6 rounded-2xl shadow-sm h-fit bg-white sticky top-8">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="flex justify-between mb-2 text-gray-600">
            <span>Subtotal</span>
            <span>₦{subtotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between mb-2 text-gray-600">
            <span>Delivery</span>
            <span>{deliveryFee === 0 ? "Free" : `₦${deliveryFee.toLocaleString()}`}</span>
          </div>

          <div className="flex justify-between font-extrabold text-xl border-t pt-4 mt-4">
            <span>Total</span>
            <span className="text-orange-600">₦{total.toLocaleString()}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="mt-6 w-full bg-orange-500 text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-100"
          >
            Proceed to Checkout
          </button>

          <button
            onClick={clearCart}
            className="mt-3 w-full text-gray-400 text-sm hover:text-red-500 transition"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </main>
  );
}