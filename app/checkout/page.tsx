"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrderContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate the total price of the cart
  const totalPrice = cartItems.reduce((acc, item) => acc + (Number(item.price) || 0), 0);

  // In a real app, this comes from your AuthContext or Session
  const userEmail = "test@example.com";

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    try {
      // We pass the cart, email, and the calculated total to the context
      await placeOrder(cartItems); 
      
      toast.success("Order placed successfully! 🎉");
      clearCart();
      router.push("/orders");
    } catch (err) {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 px-4 text-black">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <button 
          onClick={() => router.push("/")}
          className="mt-4 text-orange-500 font-bold hover:underline"
        >
          Go back to shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 text-black">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Checkout Summary</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Item List */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 border-b bg-gray-50 font-bold">Items ({cartItems.length})</div>
            <div className="divide-y">
              {cartItems.map((item, idx) => (
                <div key={idx} className="p-4 flex gap-4 items-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-lg border overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image?.replace(/['"]+/g, '')} 
                      alt={item.name} 
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 line-clamp-1">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <div className="font-bold text-gray-900">
                    ₦{Number(item.price).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Sidebar */}
        <div className="space-y-4">
          <div className="bg-white border rounded-2xl p-6 shadow-sm sticky top-6">
            <h2 className="text-xl font-bold mb-4">Order Total</h2>
            
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₦{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-bold uppercase text-sm">Free</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-extrabold text-lg">
                <span>Total</span>
                <span className="text-orange-600">₦{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg transition active:scale-95 disabled:bg-gray-300 shadow-lg shadow-orange-100"
            >
              {isProcessing ? "Processing..." : "Confirm & Pay"}
            </button>
            
            <p className="text-xs text-center text-gray-400 mt-4">
              By clicking "Confirm & Pay", you agree to our terms of service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}