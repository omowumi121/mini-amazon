"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { apiRequest } from "@/lib/api"; // Assuming your Axios instance is here
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

interface Order {
  id: string;
  items: any[]; 
  total: number;
  date: string;
  status: string;
}

interface OrderContextType {
  orders: Order[];
  placeOrder: (items: any[]) => Promise<void>;
  fetchOrders: () => Promise<void>;
  loading: boolean;
}

const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  // 1. Fetch orders from the Backend
  const fetchOrders = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await apiRequest<Order[]>("/product/getorders");
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  // 2. Place order to the Backend
  const placeOrder = async (items: any[]) => {
    if (!token) {
      toast.error("Please login to place an order");
      return;
    }

    try {
      // Your API expects an array of Product IDs: ["id1", "id2"]
      const productIds = items.map(item => item.id || item._id);

     await apiRequest("/product/creatorder", {
         method: "POST",
          body: JSON.stringify({
          products: productIds,
  }),
});
      toast.success("Order placed on server!");
      await fetchOrders(); // Refresh list from backend
    } catch (err) {
      toast.error("Failed to place order on server");
      throw err;
    }
  };

  // Fetch orders automatically when the user logs in
  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  return (
    <OrderContext.Provider value={{ orders, placeOrder, fetchOrders, loading }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used inside OrderProvider");
  return context;
};