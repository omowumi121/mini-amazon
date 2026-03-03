// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-orange-500">
        MiniAmazon
      </Link>

      <div className="flex items-center gap-6">
        <Link href="/products" className="hover:text-orange-500">
          Products
        </Link>

        {/* Auth Section */}
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user.email}</span>

            <button
              onClick={logout}
              className="text-sm text-red-500 hover:underline"
            >
              Logout
            </button>

            {/* Admin button only for admin */}
            {user.isAdmin && (
              <Link
                href="/admin"
                className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition"
              >
                Admin
              </Link>
            )}
          </div>
        ) : (
          <>
            <Link href="/login" className="hover:text-orange-500">
              Login
            </Link>
            <Link
              href="/register"
              className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 transition"
            >
              Register
            </Link>
          </>
        )}

        {/* Cart */}
        <Link href="/cart" className="relative">
          <FaShoppingCart size={22} />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartItems.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
