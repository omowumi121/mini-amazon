"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { FaShoppingCart, FaBars, FaTimes, FaSearch } from "react-icons/fa";

export default function Navbar() {
  const { cartItems } = useCart();
  const { token, logout } = useAuth();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const closeMenu = () => setIsOpen(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;

    router.push(`/products?search=${search}`);
    setSearch("");
  };

  return (
    <nav className="bg-white text-black shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center py-4">

          {/* Logo */}

          <Link
            href="/"
            onClick={closeMenu}
            className="text-2xl font-bold text-orange-500 italic"
          >
            Besty'<span className="font-semibold text-amber-300">s</span>
          </Link>

          {/* Desktop Search */}

          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center bg-white border border-gray-300 rounded-md overflow-hidden w-2/5 shadow-sm"
          >

            <input
              type="text"
              placeholder="Search products, brands and categories"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 text-gray-800 placeholder-gray-500 focus:outline-none"
            />

            <button
              type="submit"
              className="bg-orange-500 px-5 py-2 text-white hover:bg-orange-600"
            >
              <FaSearch />
            </button>

          </form>

          {/* Desktop Menu */}

          <div className="hidden md:flex items-center gap-6">

            <Link href="/products" className="hover:text-orange-400">
              Products
            </Link>

            {token ? (
              <>
                <button
                  onClick={handleLogout}
                  className="text-sm text-black hover:underline"
                >
                  Logout
                </button>

                <Link
                  href="/admin"
                  className="bg-black text-white px-3 py-1 rounded hover:text-orange-300"
                >
                  Admin
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-orange-300">
                  Login
                </Link>

                <Link
                  href="/register"
                  className="bg-orange-400 px-3 py-1 rounded hover:bg-orange-600"
                >
                  Register
                </Link>
              </>
            )}

            {/* Cart */}

            <Link
              href="/cart"
              className="relative flex items-center gap-2 hover:text-orange-400"
            >

              <FaShoppingCart size={15} />

              <span className="font-medium">Cart</span>

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

        {/* Mobile Menu */}

        {isOpen && (
          <div className="md:hidden flex flex-col gap-4 pb-4 border-t border-gray-300 pt-4">

            <form
              onSubmit={handleSearch}
              className="flex bg-white border border-gray-300 rounded-md overflow-hidden"
            >

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 px-3 py-2 text-gray-800"
              />

              <button
                type="submit"
                className="bg-orange-500 px-4 py-2 text-white"
              >
                <FaSearch />
              </button>

            </form>

            <Link href="/products" onClick={closeMenu}>
              Products
            </Link>

            {token ? (
              <>
                <button
                  onClick={handleLogout}
                  className="text-red-400 text-left"
                >
                  Logout
                </button>

                <Link
                  href="/admin"
                  onClick={closeMenu}
                  className="bg-orange-500 px-3 py-1 rounded text-center"
                >
                  Admin
                </Link>
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
              className="flex items-center bg-orange-300 hover:bg-orange-500 gap-2 px-3 py-2 rounded"
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
