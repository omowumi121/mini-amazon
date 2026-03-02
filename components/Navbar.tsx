"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { FaShoppingCart } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center relative z-50">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-orange-500">
        Mini-store
      </Link>

      <div className="flex items-center gap-6">
        <Link href="/products" className="hover:text-orange-500 transition">
          Products
        </Link>

        {!user ? (
          <>
            <Link href="/login" className="hover:text-orange-500 transition">
              Login
            </Link>
            <Link
              href="/register"
              className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 transition"
            >
              Register
            </Link>
          </>
        ) : (
          <div className="relative" ref={dropdownRef}>
            {/* User Email Button */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-gray-700 hover:text-orange-500 transition px-2 py-1"
            >
              {user.email} ▼
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow-md flex flex-col z-50">
                <Link
                  href="/orders"
                  className="px-4 py-2 hover:bg-orange-100 transition"
                  onClick={() => setDropdownOpen(false)}
                >
                  Orders
                </Link>
                <Link
                  href="/profile"
                  className="px-4 py-2 hover:bg-orange-100 transition"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setDropdownOpen(false);
                  }}
                  className="px-4 py-2 text-red-500 hover:bg-red-50 transition text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {/* Cart Icon */}
        <Link
          href="/cart"
          className="relative transform transition-all duration-200 hover:scale-110 hover:text-orange-500"
        >
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
