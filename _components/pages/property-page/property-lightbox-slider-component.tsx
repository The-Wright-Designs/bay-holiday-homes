"use client";

import { useState, useEffect } from "react";
import classNames from "classnames";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { X, SquareArrowLeft, SquareArrowRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface PropertyLightboxSliderProps {
  images: string[];
  propertyName: string;
  cssClasses?: string;
}

export default function PropertyLightboxSliderComponent({
  images,
  propertyName,
  cssClasses,
}: PropertyLightboxSliderProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={classNames(
          "relative grid grid-cols-2 gap-3 desktop:grid-cols-[1fr_0.45fr] desktop:h-[550px]",
          cssClasses,
        )}
      >
        <div className="relative aspect-[16/7] w-full overflow-hidden col-span-2 tablet:h-[40vh] desktop:col-span-1 desktop:row-span-2 desktop:aspect-auto desktop:h-full">
          <Image
            src={images[0]}
            alt={propertyName}
            fill
            className="object-cover"
            sizes="(max-width: 800px) 100vw, 1280px"
            priority
          />
        </div>

        <div className="relative flex-1 w-full aspect-[3.5/4] overflow-hidden tablet:h-[35vh] desktop:aspect-auto desktop:h-full">
          <Image
            src={images[1] ?? images[0]}
            alt={propertyName}
            fill
            className="object-cover"
            sizes="(max-width: 800px) 50vw, 640px"
          />
        </div>
        <div className="relative flex-1 w-full aspect-[3.5/4] overflow-hidden tablet:h-[35vh] desktop:aspect-auto desktop:h-full">
          <Image
            src={images[2] ?? images[0]}
            alt={propertyName}
            fill
            className="object-cover"
            sizes="(max-width: 800px) 50vw, 640px"
          />
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="absolute bottom-3 left-3 flex items-center gap-1 bg-teal/90 px-2.5 py-2 rounded-[2px] desktop:hover:cursor-pointer desktop:hover:opacity-90 ease-in-out duration-300"
        >
          <span className="text-[14px] text-white font-medium whitespace-nowrap">
            {images.length} photos
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="size-5"
          >
            <mask
              id="mask0_102_503"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="16"
              height="16"
            >
              <rect width="16" height="16" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_102_503)">
              <path
                d="M3.33333 11.9C3.93333 11.3111 4.63056 10.8472 5.425 10.5083C6.21944 10.1694 7.07778 10 8 10C8.92222 10 9.78056 10.1694 10.575 10.5083C11.3694 10.8472 12.0667 11.3111 12.6667 11.9V3.33333H3.33333V11.9ZM8 8.66667C8.64444 8.66667 9.19445 8.43889 9.65 7.98333C10.1056 7.52778 10.3333 6.97778 10.3333 6.33333C10.3333 5.68889 10.1056 5.13889 9.65 4.68333C9.19445 4.22778 8.64444 4 8 4C7.35556 4 6.80556 4.22778 6.35 4.68333C5.89444 5.13889 5.66667 5.68889 5.66667 6.33333C5.66667 6.97778 5.89444 7.52778 6.35 7.98333C6.80556 8.43889 7.35556 8.66667 8 8.66667ZM3.33333 14C2.96667 14 2.65278 13.8694 2.39167 13.6083C2.13056 13.3472 2 13.0333 2 12.6667V3.33333C2 2.96667 2.13056 2.65278 2.39167 2.39167C2.65278 2.13056 2.96667 2 3.33333 2H12.6667C13.0333 2 13.3472 2.13056 13.6083 2.39167C13.8694 2.65278 14 2.96667 14 3.33333V12.6667C14 13.0333 13.8694 13.3472 13.6083 13.6083C13.3472 13.8694 13.0333 14 12.6667 14H3.33333ZM4.48333 12.6667H11.5167C11.0278 12.2333 10.475 11.9028 9.85833 11.675C9.24167 11.4472 8.62222 11.3333 8 11.3333C7.37778 11.3333 6.75278 11.4472 6.125 11.675C5.49722 11.9028 4.95 12.2333 4.48333 12.6667ZM8 7.33333C7.72222 7.33333 7.48611 7.23611 7.29167 7.04167C7.09722 6.84722 7 6.61111 7 6.33333C7 6.05556 7.09722 5.81944 7.29167 5.625C7.48611 5.43056 7.72222 5.33333 8 5.33333C8.27778 5.43056 8.51389 5.43056 8.70833 5.625C8.90278 5.81944 9 6.05556 9 6.33333C9 6.61111 8.90278 6.84722 8.70833 7.04167C8.51389 7.23611 8.27778 7.33333 8 7.33333Z"
                fill="#FFFFFF"
              />
            </g>
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 overflow-hidden">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute -m2 p-2 top-5.5 right-4.5 z-10 desktop:hidden"
            aria-label="Close gallery"
          >
            <X size={32} color="#FFFFFF" />
          </button>

          <div className="relative w-full max-w-[1280px] px-14">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation={{
                prevEl: ".swiper-lightbox-prev",
                nextEl: ".swiper-lightbox-next",
              }}
              pagination={{ dynamicBullets: true }}
              loop
              slidesPerView={1}
              spaceBetween={40}
              style={
                {
                  "--swiper-pagination-color": "#4AB5BB",
                  "--swiper-pagination-bullet-inactive-color": "#4AB5BB",
                  "--swiper-pagination-bullet-inactive-opacity": "0.5",
                } as React.CSSProperties
              }
              className="overflow-hidden"
            >
              {images.map((src, index) => (
                <SwiperSlide key={index} className="pb-10">
                  <div className="relative aspect-square tablet:aspect-video w-full">
                    <Image
                      src={src}
                      alt={`${propertyName} — photo ${index + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width:1280px) 100vw, 1280px"
                    />
                  </div>
                </SwiperSlide>
              ))}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-0 -right-7 z-10 hover:cursor-pointer hover:opacity-90 ease-in-out duration-300 p-2 -m-2 rounded-md bg-teal/80"
                aria-label="Close gallery"
              >
                <X size={32} color="#FFFFFF" />
              </button>
            </Swiper>

            <button
              className="hidden desktop:block p-2 -m-2 bg-teal/70 rounded-md swiper-lightbox-prev absolute left-7 top-1/2 -translate-y-1/2 z-10 hover:cursor-pointer hover:opacity-80 ease-in-out duration-300"
              aria-label="Previous photo"
            >
              <SquareArrowLeft size={28} color="#FFFFFF" />
            </button>
            <button
              className="hidden desktop:block p-2 -m-2 bg-teal/70 rounded-md swiper-lightbox-next absolute right-7 top-1/2 -translate-y-1/2 z-10 hover:cursor-pointer hover:opacity-80 ease-in-out duration-300"
              aria-label="Next photo"
            >
              <SquareArrowRight size={28} color="#FFFFFF" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
