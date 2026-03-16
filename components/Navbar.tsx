// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useCart } from "@/context/CartContext";
// import { useAuth } from "@/context/AuthContext";
// import { FaShoppingCart, FaBars, FaTimes, FaSearch } from "react-icons/fa";

// export default function Navbar() {
//   const { cartItems } = useCart();
//   const { token, loading, logout } = useAuth(); // Destructured 'loading'
//   const router = useRouter();

//   const [isOpen, setIsOpen] = useState(false);
//   const [search, setSearch] = useState("");
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const handleLogout = () => {
//     logout();
//     setIsOpen(false);
//     router.push("/login");
//   };

//   const closeMenu = () => setIsOpen(false);

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!search.trim()) return;
//     router.push(`/products?search=${search}`);
//     setSearch("");
//     setIsOpen(false);
//   };

//   // Prevent server-side rendering mismatch
//   if (!mounted) return <nav className="h-16 bg-white shadow-md sticky top-0 z-50" />;

//   return (
//     <nav className="bg-white text-black shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center py-4">
          
//           {/* Logo */}
//           <Link href="/" onClick={closeMenu} className="text-2xl font-bold text-orange-500 italic">
//             Besty'<span className="font-semibold text-amber-300">s</span>
//           </Link>

//           {/* Desktop Search */}
//           <form onSubmit={handleSearch} className="hidden md:flex items-center bg-white border border-gray-300 rounded-md overflow-hidden w-2/5 shadow-sm">
//             <input
//               type="text"
//               placeholder="Search products, brands and categories"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="flex-1 px-4 py-2 text-gray-800 placeholder-gray-500 focus:outline-none"
//             />
//             <button type="submit" className="bg-orange-500 px-5 py-2 text-white hover:bg-orange-600">
//               <FaSearch />
//             </button>
//           </form>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center gap-6">
//             <Link href="/products" className="hover:text-orange-400">Products</Link>

//             {/* Auth Check with Loading Guard */}
//             {!loading && (
//               token ? (
//                 <>
//                   <button onClick={handleLogout} className="text-sm text-black hover:underline">
//                     Logout
//                   </button>
//                   <Link href="/admin" className="bg-black text-white px-3 py-1 rounded hover:text-orange-300 transition-colors">
//                     Admin
//                   </Link>
//                 </>
//               ) : (
//                 <>
//                   <Link href="/login" className="hover:text-orange-400">Login</Link>
//                   <Link href="/register" className="bg-orange-400 px-3 py-1 rounded hover:bg-orange-600 text-white transition-colors">
//                     Register
//                   </Link>
//                 </>
//               )
//             )}

//             {/* Cart */}
//             <Link href="/cart" className="relative flex items-center gap-2 hover:text-orange-400">
//               <FaShoppingCart size={18} />
//               <span className="font-medium">Cart</span>
//               {cartItems.length > 0 && (
//                 <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
//                   {cartItems.length}
//                 </span>
//               )}
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <button className="md:hidden p-2 text-gray-600" onClick={() => setIsOpen(!isOpen)}>
//             {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//           </button>
//         </div>

//         {/* Mobile Menu Content */}
//         {isOpen && (
//           <div className="md:hidden flex flex-col gap-4 pb-6 border-t border-gray-100 pt-4 animate-in slide-in-from-top duration-300">
//             <form onSubmit={handleSearch} className="flex bg-white border border-gray-300 rounded-md overflow-hidden">
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="flex-1 px-3 py-2 text-gray-800 focus:outline-none"
//               />
//               <button type="submit" className="bg-orange-500 px-4 py-2 text-white">
//                 <FaSearch />
//               </button>
//             </form>

//             <Link href="/products" onClick={closeMenu} className="text-lg font-medium hover:text-orange-500">
//               Products
//             </Link>

//             {!loading && (
//               token ? (
//                 <>
//                   <Link href="/admin" onClick={closeMenu} className="bg-black text-white px-3 py-2 rounded text-center">
//                     Admin Dashboard
//                   </Link>
//                   <button onClick={handleLogout} className="text-red-500 text-left font-medium">
//                     Logout
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <Link href="/login" onClick={closeMenu} className="text-lg font-medium hover:text-orange-500">
//                     Login
//                   </Link>
//                   <Link href="/register" onClick={closeMenu} className="bg-orange-500 text-white px-3 py-2 rounded text-center font-bold">
//                     Register
//                   </Link>
//                 </>
//               )
//             )}

//             <Link href="/cart" onClick={closeMenu} className="flex items-center justify-center bg-orange-100 hover:bg-orange-200 gap-2 px-3 py-3 rounded text-orange-700 font-bold">
//               <FaShoppingCart />
//               Cart ({cartItems.length})
//             </Link>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }




"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { FaShoppingCart, FaBars, FaTimes, FaSearch, FaBox } from "react-icons/fa";

export default function Navbar() {
  const { cartItems } = useCart();
  // ✅ Destructured 'user' to access is_admin status
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

  const closeMenu = () => setIsOpen(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/products?search=${search}`);
    setSearch("");
    setIsOpen(false);
  };

  if (!mounted) return <nav className="h-16 bg-white shadow-md sticky top-0 z-50" />;

  return (
    <nav className="bg-white text-black shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo */}
          <Link href="/" onClick={closeMenu} className="text-2xl font-bold text-orange-500 italic">
            Besty'<span className="font-semibold text-amber-300">s</span>
          </Link>

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center bg-white border border-gray-300 rounded-md overflow-hidden w-2/5 shadow-sm">
            <input
              type="text"
              placeholder="Search products, brands and categories"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 text-gray-800 placeholder-gray-500 focus:outline-none"
            />
            <button type="submit" className="bg-orange-500 px-5 py-2 text-white hover:bg-orange-600">
              <FaSearch />
            </button>
          </form>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/products" className="hover:text-orange-400">Products</Link>

            {!loading && (
              token ? (
                <>
                  {/* ✅ New link to the Orders page */}
                  <Link href="/order" className="hover:text-orange-400 flex items-center gap-1">
                    <FaBox size={14} /> My Orders
                  </Link>

                  <button onClick={handleLogout} className="text-sm text-black hover:underline">
                    Logout
                  </button>

                  {/* ✅ THE FIX: Only show Admin if user exists and is_admin is true */}
                  {user?.is_admin && (
                    <Link href="/admin" className="bg-black text-white px-3 py-1 rounded hover:text-orange-300 transition-colors">
                      Admin
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link href="/login" className="hover:text-orange-400">Login</Link>
                  <Link href="/register" className="bg-orange-400 px-3 py-1 rounded hover:bg-orange-600 text-white transition-colors">
                    Register
                  </Link>
                </>
              )
            )}

            {/* Cart */}
            <Link href="/cart" className="relative flex items-center gap-2 hover:text-orange-400">
              <FaShoppingCart size={18} />
              <span className="font-medium">Cart</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-gray-600" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu Content */}
        {isOpen && (
          <div className="md:hidden flex flex-col gap-4 pb-6 border-t border-gray-100 pt-4 animate-in slide-in-from-top duration-300">
            <form onSubmit={handleSearch} className="flex bg-white border border-gray-300 rounded-md overflow-hidden">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 px-3 py-2 text-gray-800 focus:outline-none"
              />
              <button type="submit" className="bg-orange-500 px-4 py-2 text-white">
                <FaSearch />
              </button>
            </form>

            <Link href="/products" onClick={closeMenu} className="text-lg font-medium hover:text-orange-500">
              Products
            </Link>

            {!loading && (
              token ? (
                <>
                  <Link href="/order" onClick={closeMenu} className="text-lg font-medium hover:text-orange-500">
                    My Orders
                  </Link>
                  
                  {/* ✅ THE FIX: Admin check for Mobile menu */}
                  {user?.is_admin && (
                    <Link href="/admin" onClick={closeMenu} className="bg-black text-white px-3 py-2 rounded text-center">
                      Admin Dashboard
                    </Link>
                  )}
                  
                  <button onClick={handleLogout} className="text-red-500 text-left font-medium">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={closeMenu} className="text-lg font-medium hover:text-orange-500">
                    Login
                  </Link>
                  <Link href="/register" onClick={closeMenu} className="bg-orange-500 text-white px-3 py-2 rounded text-center font-bold">
                    Register
                  </Link>
                </>
              )
            )}

            <Link href="/cart" onClick={closeMenu} className="flex items-center justify-center bg-orange-100 hover:bg-orange-200 gap-2 px-3 py-3 rounded text-orange-700 font-bold">
              <FaShoppingCart />
              Cart ({cartItems.length})
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}