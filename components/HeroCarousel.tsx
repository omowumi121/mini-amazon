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
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000 }}
      loop
      className="w-full rounded-xl overflow-hidden"
    >
      {slides.map((src, i) => (
        <SwiperSlide key={i}>
          <div className="relative w-full h-[300px] md:h-[350px]">

            <Image
              src={src}
              alt={`Banner ${i + 1}`}
              fill
              className="object-cover"
              priority={i === 0}
            />

          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
