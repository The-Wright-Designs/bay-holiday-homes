"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { SquareArrowLeft, SquareArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TopPropertiesSliderProps } from "@/_types/top-properties-types";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function TopPropertiesSlider({
  cssClasses,
  topProperties,
}: TopPropertiesSliderProps) {
  return (
    <div className="relative">
      <div className="overflow-x-hidden desktop:mx-20">
        <Swiper
          autoplay={{
            delay: 6000,
            disableOnInteraction: true,
          }}
          speed={1000}
          modules={[Autoplay, Pagination, Navigation]}
          className={cssClasses}
          pagination={{
            dynamicBullets: true,
          }}
          navigation={{
            prevEl: ".swiper-top-properties-button-prev-custom",
            nextEl: ".swiper-top-properties-button-next-custom",
          }}
          loop
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            425: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            800: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          style={
            {
              "--swiper-pagination-color": "#4AB5BB",
              "--swiper-pagination-bullet-inactive-color": "#4AB5BB",
              "--swiper-pagination-bullet-inactive-opacity": "0.5",
              "--swiper-pagination-bullet-horizontal-gap": "6px",
            } as React.CSSProperties
          }
        >
          {topProperties.map((property) => (
            <SwiperSlide key={property.id} className="pb-10">
              <Link
                href={property.href}
                className="group relative flex flex-col items-center justify-center aspect-square w-full overflow-hidden desktop:hover:cursor-pointer"
              >
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-500 delay-75 desktop:group-hover:scale-105"
                  sizes="(max-width: 425px) 100vw, (max-width: 800px) 50vw, 25vw"
                />
                <div className="relative bg-white/80 rounded-lg p-4 w-[200px] flex items-center justify-center desktop:group-hover:bg-teal ease-in-out duration-500 delay-150">
                  <p className="text-[20px] text-center text-black desktop:group-hover:text-white ease-in-out duration-500 delay-200">
                    {property.title}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <button
        className="swiper-top-properties-button-prev-custom hidden desktop:flex absolute left-0 top-1/2 -translate-y-full z-20 items-center justify-center transition-all duration-300 ease-in-out desktop:hover:cursor-pointer desktop:hover:scale-105"
        aria-label="Previous slide"
      >
        <SquareArrowLeft
          className="w-8 h-8 ease-in-out duration-300"
          color="#4ab5bb"
        />
      </button>
      <button
        className="swiper-top-properties-button-next-custom hidden desktop:flex absolute right-0 top-1/2 -translate-y-full z-20 items-center justify-center transition-all duration-300 ease-in-out desktop:hover:cursor-pointer desktop:hover:scale-105"
        aria-label="Next slide"
      >
        <SquareArrowRight
          className="w-8 h-8 ease-in-out duration-300"
          color="#4ab5bb"
        />
      </button>
    </div>
  );
}
