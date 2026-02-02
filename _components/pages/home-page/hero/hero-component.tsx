"use client";

import Image from "next/image";
import PropertySearchWrapper from "@/_components/ui/property-search/property-search-wrapper";

export default function HeroComponent() {
  return (
    <main className="max-w-[1280px] mx-auto">
      <div className="relative w-full">
        <div className="relative h-[500px] w-full tablet:h-[575px] desktop:h-[672px]">
          <Image
            src="/images/hero/bay-holiday-homes-plettenberg-bay.jpg"
            alt="Bay Holiday Homes Plettenberg Bay coastal view"
            width={1280}
            height={700}
            className="h-full w-full object-cover object-top"
            priority
          />
        </div>

        <div className="absolute w-[80%] max-w-[250px] left-1/2 top-[37px] -translate-x-1/2 bg-white/60 px-3 py-5 rounded-[2px] flex flex-col gap-2 items-center desktop:bg-none desktop:p-0 desktop:max-w-[739px] desktop:top-[81px]">
          <div className="w-full border-b border-navy border-solid pb-2">
            <h1 className="text-navy text-[20px] font-bold text-center desktop:text-[40px] desktop:font-semibold">
              Bay Holiday Homes in Plettenberg Bay
            </h1>
          </div>
          <p className="text-navy text-[16px] text-center w-full desktop:text-[22px] desktop:font-normal">
            Specialists in Holiday Rentals and Home Management
          </p>
        </div>

        <PropertySearchWrapper cssClasses="absolute w-full flex justify-center left-1/2 bottom-15 -translate-x-1/2" />
      </div>

      <div className="bg-teal p-10 flex flex-col items-center w-full desktop:rounded-b-[16px]">
        <div className="flex flex-col gap-5 text-center w-full">
          <h2 className="text-white font-normal text-[28px] desktop:text-[40px]">
            Your Property, Our Priority — A Partnership You Can Trust
          </h2>
          <div className="grid gap-5">
            <p className="text-[20px] text-navy">
              At Bay Holiday Homes, your property is more than bricks and land,
              we care for your home, your family&apos;s legacy, your investment.
            </p>
            <p className="text-[20px] text-navy">
              Our reputation rests on honesty, integrity, and genuine care for
              every client we serve. Whether your home is for family alone or
              available for holiday rentals,
            </p>
            <p className="text-[20px] text-navy">
              Our Promise is true: Your Property, Our Priority — A Partnership
              You Can Trust
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
