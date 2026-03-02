"use client";

import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrderContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const router = useRouter();

  const handlePlaceOrder = () => {
    placeOrder(cartItems);
    clearCart();
    router.push("/orders");
  };

  if (cartItems.length === 0) {
    return <p className="text-center py-20">No items to checkout.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Confirm Order</h1>

      <p className="mb-6">
        You are about to place an order for {cartItems.length} item(s).
      </p>

      <button
        onClick={handlePlaceOrder}
        className="bg-green-500 text-white px-6 py-3 rounded"
      >
        Place Order
      </button>
    </div>
  );
}
