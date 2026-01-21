"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { SquareArrowLeft, SquareArrowRight } from "lucide-react";
import Image from "next/image";
import { TestimonialsSliderProps } from "@/_types/testimonials-types";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function TestimonialsSlider({
  cssClasses,
  testimonials,
}: TestimonialsSliderProps) {
  return (
    <div className="relative">
      <div className="overflow-x-hidden">
        <Swiper
          autoplay={{
            delay: 8000,
            disableOnInteraction: true,
          }}
          speed={1000}
          modules={[Autoplay, Pagination, Navigation]}
          className={cssClasses}
          pagination={{
            dynamicBullets: true,
          }}
          navigation={{
            prevEl: ".swiper-testimonials-button-prev-custom",
            nextEl: ".swiper-testimonials-button-next-custom",
          }}
          loop
          style={
            {
              "--swiper-pagination-color": "#4AB5BB",
              "--swiper-pagination-bullet-inactive-color": "#4AB5BB",
              "--swiper-pagination-bullet-inactive-opacity": "0.5",
              "--swiper-pagination-bullet-horizontal-gap": "6px",
            } as React.CSSProperties
          }
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="pb-10">
              <div className="flex flex-col gap-3 items-center justify-center text-center px-5 desktop:px-0 min-h-[134px]">
                <div className="flex gap-[2px] items-center">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Image
                      key={starIndex}
                      src="/icons/star.svg"
                      alt="Review star"
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                  ))}
                </div>
                <blockquote className="text-[18px] font-light text-black max-w-[900px]">
                  &quot;{testimonial.testimonial}&quot;
                </blockquote>
                <cite className="text-[18px] font-light italic text-black">
                  - {testimonial.author}
                </cite>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <button
        className="swiper-testimonials-button-prev-custom hidden desktop:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 items-center justify-center transition-all duration-300 ease-in-out desktop:hover:cursor-pointer desktop:hover:scale-105"
        aria-label="Previous slide"
      >
        <SquareArrowLeft className="w-8 h-8 text-teal hover:text-navy ease-in-out duration-300" />
      </button>
      <button
        className="swiper-testimonials-button-next-custom hidden desktop:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 items-center justify-center transition-all duration-300 ease-in-out desktop:hover:cursor-pointer desktop:hover:scale-105"
        aria-label="Next slide"
      >
        <SquareArrowRight className="w-8 h-8 text-teal hover:text-navy ease-in-out duration-300" />
      </button>
    </div>
  );
}
