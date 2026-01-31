"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HeroCarousel() {
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80",
      title: "Pure Mustard Oil",
      subtitle: "Cold-pressed, unadulterated – straight from our mill",
    },
    {
      image: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&w=2000&q=80",
      title: "Fresh Whole Wheat Atta",
      subtitle: "Stone-ground, no maida – pure nutrition",
    },
    {
      image: "https://images.unsplash.com/photo-1597843786411-a7fa8ed2f1c4?auto=format&fit=crop&w=2000&q=80",
      title: "Premium Dal Collection",
      subtitle: "Moong, masoor, chana – cleaned & sorted",
    },
    {
      image: "https://images.unsplash.com/photo-1581093458793-2d7f8a7c3f5d?auto=format&fit=crop&w=2000&q=80",
      title: "From Our Mill to Your Home",
      subtitle: "Traditional quality, modern trust",
    },
  ];

  return (
    <Swiper
      modules={[Navigation, Autoplay, Pagination]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop
      className="h-[60vh] sm:h-[80vh] lg:h-[90vh]"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="relative h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover brightness-75"
              priority={index === 0}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <div className="text-center px-4 max-w-4xl">
                <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
                  {slide.title}
                </h1>
                <p className="text-xl sm:text-2xl text-white mb-8 drop-shadow-lg">
                  {slide.subtitle}
                </p>
                <Link href="/products" className="btn btn-primary btn-lg">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}