"use client";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; 
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { OrderProvider } from "@/context/OrderContext";
import { ProductProvider } from "@/context/ProductContext";
import { Toaster } from "react-hot-toast";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen flex flex-col">
  <AuthProvider>
    <CartProvider>
      <OrderProvider>
        <ProductProvider>
          <Navbar />
          <Toaster position="top-right" />
          <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
        </ProductProvider>
      </OrderProvider>
    </CartProvider>
  </AuthProvider>
</body>
    </html>
  );
}
