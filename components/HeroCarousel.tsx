"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";

export default function HeroCarousel() {
  const slides = [
    "/images/banner1.jpg",
    "/images/banner2.jpg",
    "/images/banner3.jpg",
  ];

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000 }}
      loop
      className="w-full mb-8"
    >
      {slides.map((src, i) => (
        <SwiperSlide key={i}>
          {/* Parent container fixed height */}
          <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 flex justify-center items-center">
            <Image
              src={src}
              alt={`Banner ${i + 1}`}
              width={600}      // <-- control image width
              height={400}     // <-- control image height
              className="object-contain" // <-- ensures image fits inside without cropping
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
