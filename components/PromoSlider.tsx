"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"

type Promo = {
  title: string
  img: string
}

const promos: Promo[] = [
  { title: "Exclusive Catalog Offers", img: "/promo1.png" },
  { title: " Groceries", img: "/promo2.png" },
  { title: "Send Packages Securely", img: "/promo3.png" },
  { title: "Buy 2 Pay for 1", img: "/promo4.png" },
  { title: "Deals of the Month", img: "/promo5.png" },
  { title: "baby needs", img: "/promo6.png" },
  { title: "Rechargeable Fan", img: "/promo7.png" },
  { title: "Order package ", img: "/promo8.png" },
  { title: "Up to 80% off", img: "/promo9.png" },
  { title: "Extra 10% Off", img: "/promo10.png" },
]

export default function PromoSlider() {
  return (
    <section className="w-full py-6 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={15}
          slidesPerView={6}
          slidesPerGroup={4}
        >
          {promos.map((promo, index) => (
            <SwiperSlide key={index}>
              <div className="bg-gray-100 rounded-lg p-2 hover:shadow-md transition cursor-pointer">

                <img
                  src={promo.img}
                  alt={promo.title}
                  className="w-full h-20 object-cover rounded-md"
                />

                <p className="text-xs font-medium text-center mt-2">
                  {promo.title}
                </p>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  )
}
