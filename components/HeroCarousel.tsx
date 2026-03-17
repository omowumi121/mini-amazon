"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";

export default function HeroCarousel() {
  const slides = [
    "/images/stay1.jpg",
    "/images/stay2.jpg",
    "/images/stay3.jpg",
  ];

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      pagination={{ 
        clickable: true,
        dynamicBullets: true 
      }}
      autoplay={{ 
        delay: 5000, 
        disableOnInteraction: false 
      }}
      loop
      className="w-full h-full"
    >
      {slides.map((src, i) => (
        <SwiperSlide key={i}>
          {/* Responsive container heights */}
          <div className="relative w-full h-[200px] sm:h-[300px] lg:h-[400px]">
            <Image
              src={src}
              alt={`Banner ${i + 1}`}
              fill
              // Performance Optimization:
              priority={i === 0} // Highest priority for the first slide
              loading={i === 0 ? "eager" : "lazy"} // Force immediate download for slide 1
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
              className="object-cover"
              quality={90} // Balance between high quality and fast loading
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}