"use client";

import { FaTiktok, FaGooglePlay, FaApple, FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Logo + About */}
        <div>
          <h2 className="text-sm font-bold text-orange-500 mb-2">Your Mini-Store App</h2>
          <p className="text-gray-300 text-xs">
            Shop home appliances, electronics, and personal items. Add to cart and checkout easily.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-xs">
            <li><a href="/" className="hover:text-orange-500 transition">Home</a></li>
            <li><a href="/products" className="hover:text-orange-500 transition">Products</a></li>
            <li><a href="/cart" className="hover:text-orange-500 transition">Cart</a></li>
            <li><a href="/login" className="hover:text-orange-500 transition">Login</a></li>
          </ul>
        </div>

        {/* Socials + App Links */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-3 text-sm">
            <a href="#" className="hover:text-orange-500 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-orange-500 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-orange-500 transition"><FaFacebook /></a>
          </div>

          <h3 className="text-sm font-semibold mt-4 mb-1">Get Our App</h3>
          <div className="flex gap-3 text-lg">
            <a href="#" className="hover:scale-110 transition transform"><FaGooglePlay /></a>
            <a href="#" className="hover:scale-110 transition transform"><FaApple /></a>
            <a href="#" className="hover:scale-110 transition transform"><FaTiktok /></a>
          </div>
        </div>

      </div>

      <div className="mt-6 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} Mini-store. All rights reserved.
      </div>
    </footer>
  );
}
