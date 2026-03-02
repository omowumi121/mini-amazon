"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Product } from "@/types/product";

interface OrderItem extends Product {
  quantity: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  date: string;
  userEmail: string;
}

interface OrderContextType {
  orders: Order[];
  placeOrder: (items: OrderItem[], userEmail: string) => void;
  getUserOrders: (email: string) => Order[];
}

const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  // ✅ Load orders from localStorage
  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  // ✅ Save orders whenever they change
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const placeOrder = (items: OrderItem[], userEmail: string) => {
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const newOrder: Order = {
      id: Date.now().toString(),
      items,
      total,
      date: new Date().toLocaleString(),
      userEmail,
    };

    setOrders((prev) => [...prev, newOrder]);
  };

  const getUserOrders = (email: string) => {
    return orders.filter((order) => order.userEmail === email);
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder, getUserOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

// ✅ Safe hook
export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used inside OrderProvider");
  }
  return context;
};
