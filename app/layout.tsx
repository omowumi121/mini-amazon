"use client";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; 
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { OrderProvider } from "@/context/OrderContext";
import { ProductProvider } from "@/context/ProductContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              <ProductProvider>
                {/* Navbar and page content go inside ProductProvider */}
                <Navbar />
                {children}
                <Footer />
              </ProductProvider>
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
