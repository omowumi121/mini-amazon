"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { FaShoppingCart, FaBars, FaTimes, FaSearch, FaBox, FaUser } from "react-icons/fa";

export default function Navbar() {
  const { cartItems } = useCart();
  const { token, loading, logout, user } = useAuth(); 
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    router.push("/login");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/products?search=${search}`);
    setSearch("");
    setIsOpen(false);
  };

  if (!mounted) return <nav className="h-16 bg-[#131921] sticky top-0 z-50" />;

  return (
    <nav className="bg-[#131921] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 gap-4 md:gap-8">
          
          {/* Logo: Clickable and Redirects to Home */}
          <Link 
            href="/" 
            onClick={() => setIsOpen(false)} 
            className="flex items-center flex-shrink-0 cursor-pointer group py-1 border border-transparent hover:border-white px-2 rounded-sm transition-all"
          >
            <span className="text-xl md:text-2xl font-black tracking-tighter text-white">
              BESTY'S<span className="text-[#febd69]">.</span>
            </span>
          </Link>

          {/* SYSTEM/TABLET SEARCH */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 items-center max-w-3xl h-10 bg-white rounded-md overflow-hidden ring-offset-2 focus-within:ring-2 focus-within:ring-[#febd69]">
            <input
              type="text"
              placeholder="Search Besty's..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 h-full px-4 text-gray-900 placeholder-gray-500 outline-none text-sm"
            />
            <button type="submit" className="bg-[#febd69] hover:bg-[#f3a847] h-full px-5 text-[#131921] transition-colors">
              <FaSearch size={18} />
            </button>
          </form>

          {/* Desktop Menu Actions */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            {!loading && (
              token ? (
                <div className="flex flex-col group cursor-pointer relative py-1">
                  <span className="text-[11px] text-gray-300 leading-tight">Hello, {user?.name || 'User'}</span>
                  <div className="flex items-center gap-1 font-bold">
                    <span>Account & Lists</span>
                    <div className="hidden group-hover:block absolute top-full right-0 w-48 bg-white text-gray-900 shadow-xl rounded-sm p-4 mt-1 border border-gray-200 z-[60]">
                        {user?.is_admin && (
                           <Link href="/admin" className="block py-2 hover:text-orange-600 font-bold border-b border-gray-100">Admin Panel</Link>
                        )}
                        <Link href="/order" className="block py-2 hover:text-orange-600">My Orders</Link>
                        <button onClick={handleLogout} className="block w-full text-left py-2 hover:text-orange-600 text-red-600">Sign Out</button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link href="/login" className="flex flex-col border border-transparent hover:border-white px-2 py-1 rounded-sm">
                  <span className="text-[11px] text-gray-300">Hello, sign in</span>
                  <span className="font-bold">Account</span>
                </Link>
              )
            )}

            <Link href="/order" className="flex flex-col border border-transparent hover:border-white px-2 py-1 rounded-sm">
               <span className="text-[11px] text-gray-300">Returns</span>
               <span className="font-bold">& Orders</span>
            </Link>

            <Link href="/cart" className="relative flex items-end gap-1 hover:text-[#febd69] group transition-colors border border-transparent hover:border-white px-2 py-1 rounded-sm">
              <div className="relative">
                <FaShoppingCart size={24} className="text-white group-hover:text-[#febd69]" />
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#131921] text-[#febd69] text-xs font-bold px-1 min-w-[20px] text-center">
                  {cartItems.length}
                </span>
              </div>
              <span className="font-bold hidden lg:inline">Cart</span>
            </Link>
          </div>

          {/* Mobile UI Buttons */}
          <div className="flex md:hidden items-center gap-4">
            <Link href="/cart" className="relative">
               <FaShoppingCart size={22} />
               <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                 {cartItems.length}
               </span>
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="p-1">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE SEARCH */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="flex h-10 bg-white rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 text-gray-900 outline-none text-sm"
            />
            <button type="submit" className="bg-[#febd69] px-4 text-[#131921]">
              <FaSearch size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 md:hidden" onClick={() => setIsOpen(false)}>
          <div className="w-[80%] max-w-[300px] h-full bg-white flex flex-col animate-in slide-in-from-left duration-300" onClick={e => e.stopPropagation()}>
             <div className="bg-[#232f3e] p-4 flex items-center gap-3 text-white">
                <FaUser size={20} />
                <span className="font-bold text-lg">Hello, {user?.name || 'Sign In'}</span>
             </div>
             
             <div className="flex flex-col text-gray-900">
               <Link href="/" onClick={() => setIsOpen(false)} className="p-4 border-b hover:bg-gray-50 font-medium">Home</Link>
               <Link href="/products" onClick={() => setIsOpen(false)} className="p-4 border-b hover:bg-gray-50 font-medium">All Products</Link>
               <Link href="/order" onClick={() => setIsOpen(false)} className="p-4 border-b hover:bg-gray-50 font-medium">My Orders</Link>
               {user?.is_admin && (
                 <Link href="/admin" onClick={() => setIsOpen(false)} className="p-4 border-b bg-orange-50 font-bold text-orange-700">Admin Dashboard</Link>
               )}
               {!token ? (
                  <Link href="/login" onClick={() => setIsOpen(false)} className="p-4 border-b hover:bg-gray-50 font-medium">Sign In</Link>
               ) : (
                  <button onClick={handleLogout} className="p-4 text-left text-red-600 font-bold">Sign Out</button>
               )}
             </div>
          </div>
        </div>
      )}
    </nav>
  );
}