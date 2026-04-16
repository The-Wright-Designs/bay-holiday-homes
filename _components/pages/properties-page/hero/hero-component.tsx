"use client";

import Image from "next/image";
import PropertySearchWrapper from "../../../ui/property-search/property-search-wrapper";

export default function HeroComponent() {
  return (
    <main className="max-w-[1280px] mx-auto">
      <div className="relative w-full">
        <div className="relative h-[500px] w-full desktop:h-[462px]">
          <Image
            src="/images/placeholders/_MG_0420.jpg"
            alt="Bay Holiday Homes Plettenberg Bay coastal view"
            width={1280}
            height={700}
            className="h-full w-full object-cover"
            priority
          />
        </div>

        <div className="absolute w-[80%] max-w-[250px] left-1/2 top-[37px] -translate-x-1/2 bg-white/75 p-3 rounded-[2px] flex flex-col gap-2 items-center tablet:max-w-[660px] desktop:top-[81px]">
          <div className="relative w-full">
            <h1 className="text-black text-[40px] font-light text-center uppercase leading-tight">
              Plett Holiday Rentals
            </h1>
          </div>
          <p className="text-black text-[18px] font-light text-center w-full">
            House, apartment, townhouse &amp; hotel rentals in Plettenberg Bay
          </p>
        </div>

        <PropertySearchWrapper
          tealButton
          cssClasses="absolute w-full flex justify-center inset-x-0 bottom-15"
        />
      </div>
    </main>
  );
}
