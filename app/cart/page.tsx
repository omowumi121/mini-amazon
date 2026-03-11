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

  // subtotal calculation
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee = subtotal > 100 ? 0 : 10;
  const total = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <main className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500 text-lg">Your cart is empty 🛒</p>
      </main>
    );
  }

  return (
    <main className="px-4 py-8 max-w-6xl mx-auto">

      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">

        {/* CART ITEMS */}

        <div className="md:col-span-2 flex flex-col gap-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-6 border p-4 rounded-lg shadow-sm"
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

              {/* Product Info */}

              <div className="flex-1 flex flex-col justify-between">

                <div>
                  <h2 className="font-semibold text-lg">
                    {item.title}
                  </h2>

                  <p className="text-gray-600">
                    ${item.price}
                  </p>
                </div>

                {/* Quantity Controls */}

                <div className="flex items-center gap-3 mt-2">

                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                  >
                    -
                  </button>

                  <span className="font-medium">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                  >
                    +
                  </button>

                </div>
              </div>

              {/* Remove */}

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* ORDER SUMMARY */}

        <div className="border p-6 rounded-lg shadow-sm h-fit">

          <h2 className="text-xl font-semibold mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Delivery</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="mt-5 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
          >
            Proceed to Checkout
          </button>

          <button
            onClick={clearCart}
            className="mt-3 w-full bg-gray-200 py-2 rounded hover:bg-gray-300"
          >
            Clear Cart
          </button>

        </div>

      </div>

    </main>
  );
}
