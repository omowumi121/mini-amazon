import { Phone, Home, Truck } from "lucide-react";
import HeroCarousel from "./HeroCarousel";

export default function HeroSection() {
  return (
    <section className="bg-transparent md:bg-gray-100 py-6 -my-8 -mx-4 md:-mx-8">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* LEFT CATEGORY MENU */}
          <div className="hidden lg:block lg:col-span-3 bg-white rounded-lg shadow p-3">
            <ul className="space-y-2 text-sm">
              <li className="hover:text-orange-500 cursor-pointer">Appliances</li>
              <li className="hover:text-orange-500 cursor-pointer">Phones & Tablets</li>
              <li className="hover:text-orange-500 cursor-pointer">Health & Beauty</li>
              <li className="hover:text-orange-500 cursor-pointer">Home & Office</li>
              <li className="hover:text-orange-500 cursor-pointer">Electronics</li>
              <li className="hover:text-orange-500 cursor-pointer">Fashion</li>
              <li className="hover:text-orange-500 cursor-pointer">Supermarket</li>
              <li className="hover:text-orange-500 cursor-pointer">Computing</li>
              <li className="hover:text-orange-500 cursor-pointer">Baby Products</li>
              <li className="hover:text-orange-500 cursor-pointer">Gaming</li>
              <li className="hover:text-orange-500 cursor-pointer">Musical Instruments</li>
              <li className="hover:text-orange-500 cursor-pointer">Other Categories</li>
            </ul>
          </div>

          {/* CENTER CAROUSEL */}
          <div className="col-span-1 lg:col-span-7 bg-transparent md:bg-white rounded-lg overflow-hidden md:shadow">
            <HeroCarousel />
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="hidden lg:flex lg:col-span-2 flex-col gap-4">

            <div className="bg-white rounded-lg shadow p-3 space-y-3">

              <div className="flex items-center gap-2">
                <Phone size={18} className="text-orange-500" />
                <span className="text-xs font-medium">
                  CALL TO ORDER <br /> +234 907 170 3757
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Home size={18} className="text-orange-500" />
                <span className="text-xs font-medium">
                  Sell on Besty's
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Truck size={18} className="text-orange-500" />
                <span className="text-xs font-medium">
                  Send Your Packages
                </span>
              </div>

            </div>

            <div className="bg-orange-500 h-[150px] rounded-lg flex items-center justify-center text-white font-bold text-lg">
              BESTY'S STORE
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
