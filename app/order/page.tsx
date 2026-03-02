"use client";

import { useOrders } from "@/context/OrderContext";

export default function OrdersPage() {
  const { orders } = useOrders();

  if (orders.length === 0) {
    return <p className="text-center py-20">No orders yet.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>

      {orders.map((order) => (
        <div key={order.id} className="border p-4 mb-4 rounded">
          <p className="text-sm text-gray-500">Order ID: {order.id}</p>
          <p className="text-sm text-gray-500">Date: {order.date}</p>
          <p className="mt-2 font-semibold">
            Items: {order.items.length}
          </p>
        </div>
      ))}
    </div>
  );
}
