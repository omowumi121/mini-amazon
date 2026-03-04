"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-black text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            className="text-2xl font-bold text-orange-500"
          >
            MiniAmazon
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">

            <Link
              href="/products"
              className="hover:text-orange-400 transition"
            >
              Products
            </Link>

            {user ? (
              <>
                <span className="text-sm text-gray-300 truncate max-w-[150px]">
                  {user.email}
                </span>

                <button
                  onClick={handleLogout}
                  className="text-sm text-red-400 hover:underline"
                >
                  Logout
                </button>

                {user?.isAdmin && (
                  <Link
                    href="/admin"
                    className="bg-orange-500 px-3 py-1 rounded hover:bg-orange-600 transition"
                  >
                    Admin
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hover:text-orange-400"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="bg-orange-500 px-3 py-1 rounded hover:bg-orange-600 transition"
                >
                  Register
                </Link>
              </>
            )}

            {/* Cart */}
            <Link
              href="/cart"
              className="relative"
            >
              <FaShoppingCart size={20} />

              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden flex flex-col gap-4 pb-4 border-t border-gray-700 pt-4 animate-fadeIn">

            <Link href="/products" onClick={closeMenu}>
              Products
            </Link>

            {user ? (
              <>
                <span className="text-sm text-gray-300 break-all">
                  {user.email}
                </span>

                <button
                  onClick={handleLogout}
                  className="text-red-400 text-left"
                >
                  Logout
                </button>

                {user?.isAdmin && (
                  <Link
                    href="/admin"
                    onClick={closeMenu}
                    className="bg-orange-500 px-3 py-1 rounded text-center"
                  >
                    Admin
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link href="/login" onClick={closeMenu}>
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={closeMenu}
                  className="bg-orange-500 px-3 py-1 rounded text-center"
                >
                  Register
                </Link>
              </>
            )}

            <Link
              href="/cart"
              onClick={closeMenu}
              className="flex items-center gap-2"
            >
              <FaShoppingCart />
              Cart ({cartItems.length})
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
