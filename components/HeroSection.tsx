import { Phone, Home, Truck } from "lucide-react";
import HeroCarousel from "./HeroCarousel";

export default function HeroSection() {
  return (
    // 1. Color: Using Amazon's light gray background for desktop, clean white for mobile
    <section className="bg-white md:bg-[#eaeded] py-4 md:py-6 -my-8 -mx-4 md:-mx-8">
      <div className="max-w-7xl mx-auto px-0 md:px-4">

        {/* 2. Grid Spanning: 1 col on mobile, 2 on tablet, 12 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-0 md:gap-4">

          {/* LEFT CATEGORY MENU: Only visible on System (Desktop) */}
          <div className="hidden lg:block lg:col-span-3 bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <h2 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Categories</h2>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-orange-500 hover:font-medium transition-all cursor-pointer">Appliances</li>
              <li className="hover:text-orange-500 hover:font-medium transition-all cursor-pointer">Phones & Tablets</li>
              <li className="hover:text-orange-500 hover:font-medium transition-all cursor-pointer">Health & Beauty</li>
              <li className="hover:text-orange-500 hover:font-medium transition-all cursor-pointer">Home & Office</li>
              <li className="hover:text-orange-500 hover:font-medium transition-all cursor-pointer">Electronics</li>
              <li className="hover:text-orange-500 hover:font-medium transition-all cursor-pointer">Fashion</li>
              <li className="hover:text-orange-500 hover:font-medium transition-all cursor-pointer">Supermarket</li>
              <li className="hover:text-orange-500 hover:font-medium transition-all cursor-pointer">Computing</li>
            </ul>
          </div>

          {/* CENTER CAROUSEL: Full width on mobile, spans 7 columns on Desktop */}
          <div className="col-span-1 md:col-span-2 lg:col-span-7 bg-white md:rounded-lg overflow-hidden md:shadow-sm">
            <HeroCarousel />
          </div>

          {/* RIGHT SIDEBAR: Hidden on mobile, visible and stacked on Tablet/System */}
          <div className="hidden md:flex md:col-span-2 lg:col-span-2 flex-col gap-4">

            <div className="bg-white rounded-lg shadow-sm p-4 space-y-4 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-full">
                   <Phone size={18} className="text-orange-600" />
                </div>
                <span className="text-[11px] font-bold text-gray-800 leading-tight">
                  CALL TO ORDER <br /> 
                  <span className="text-orange-600">+234 907 170 3757</span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-full">
                  <Home size={18} className="text-orange-600" />
                </div>
                <span className="text-[11px] font-bold text-gray-800 leading-tight uppercase">
                  Sell on Besty's
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-full">
                  <Truck size={18} className="text-orange-600" />
                </div>
                <span className="text-[11px] font-bold text-gray-800 leading-tight uppercase">
                  Fast Delivery
                </span>
              </div>
            </div>

            {/* Amazon-style Promo Box */}
            <div className="bg-[#febd69] hover:bg-[#f3a847] transition-colors h-[160px] rounded-lg flex flex-col items-center justify-center text-slate-900 font-black text-center p-4 shadow-sm cursor-pointer">
              <p className="text-xs uppercase tracking-tighter">Limited Time</p>
              <h3 className="text-xl">BESTY'S <br/> DEALS</h3>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}