"use client";

import Link from "next/link";
import { FaTiktok, FaGooglePlay, FaApple, FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#232f3e] text-white">
      {/* 1. Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="w-full bg-[#37475a] hover:bg-[#485769] py-4 text-sm font-medium transition-colors"
      >
        Back to top
      </button>

      {/* 2. Main Footer Links Area */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700">
        
        {/* Get to Know Us */}
        <div>
          <h3 className="font-bold text-base mb-3">Get to Know Us</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/" className="hover:underline">About Besty's</Link></li>
            <li><Link href="/products" className="hover:underline">Our Products</Link></li>
            <li><Link href="#" className="hover:underline">Sustainability</Link></li>
            <li><Link href="#" className="hover:underline">Press Center</Link></li>
          </ul>
        </div>

        {/* Connect with Us */}
        <div>
          <h3 className="font-bold text-base mb-3">Connect with Us</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center gap-2 hover:underline cursor-pointer"><FaFacebook /> Facebook</li>
            <li className="flex items-center gap-2 hover:underline cursor-pointer"><FaTwitter /> Twitter</li>
            <li className="flex items-center gap-2 hover:underline cursor-pointer"><FaInstagram /> Instagram</li>
          </ul>
        </div>

        {/* Shop with Us */}
        <div>
          <h3 className="font-bold text-base mb-3">Make Money</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/login" className="hover:underline">Sell on Besty's</Link></li>
            <li><Link href="/register" className="hover:underline">Join as Vendor</Link></li>
            <li><Link href="#" className="hover:underline">Advertise Your Products</Link></li>
          </ul>
        </div>

        {/* Let Us Help You */}
        <div>
          <h3 className="font-bold text-base mb-3">Let Us Help You</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/cart" className="hover:underline">Your Account</Link></li>
            <li><Link href="/order" className="hover:underline">Your Orders</Link></li>
            <li><Link href="#" className="hover:underline">Shipping Rates</Link></li>
            <li><Link href="#" className="hover:underline">Help Center</Link></li>
          </ul>
        </div>
      </div>

      {/* 3. Bottom Branding Section */}
      <div className="bg-[#131a22] py-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          
          {/* Logo */}
          <Link href="/" className="mb-6">
            <span className="text-xl font-black tracking-tighter text-white">
              BESTY'S<span className="text-[#febd69]">.</span>
            </span>
          </Link>

          {/* App Links */}
          <div className="flex gap-6 mb-8 text-gray-400">
             <div className="flex flex-col items-center gap-1 group cursor-pointer">
                <FaGooglePlay size={24} className="group-hover:text-white transition-colors" />
                <span className="text-[10px]">Android</span>
             </div>
             <div className="flex flex-col items-center gap-1 group cursor-pointer">
                <FaApple size={24} className="group-hover:text-white transition-colors" />
                <span className="text-[10px]">iOS</span>
             </div>
             <div className="flex flex-col items-center gap-1 group cursor-pointer">
                <FaTiktok size={24} className="group-hover:text-white transition-colors" />
                <span className="text-[10px]">TikTok</span>
             </div>
          </div>

          {/* Legal / Fine Print */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[11px] text-gray-400">
            <a href="#" className="hover:underline">Conditions of Use</a>
            <a href="#" className="hover:underline">Privacy Notice</a>
            <a href="#" className="hover:underline">Interest-Based Ads</a>
            <span>&copy; {new Date().getFullYear()}, Besty's Mini-Store or its affiliates</span>
          </div>
        </div>
      </div>
    </footer>
  );
}