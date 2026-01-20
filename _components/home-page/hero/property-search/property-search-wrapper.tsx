"use client";

import ButtonType from "@/_components/ui/buttons/button-type";
import Image from "next/image";
import PropertySearchFilter from "./property-search-filter";

interface PropertySearchWrapperProps {
  cssClasses?: string;
}

const PropertySearchWrapper = ({ cssClasses }: PropertySearchWrapperProps) => {
  return (
    <div className={cssClasses}>
      <ButtonType
        type="button"
        colorWhite={true}
        cssClasses="flex items-center gap-3 desktop:hidden"
      >
        <span className="text-navy text-[16px] font-light">
          Property Search
        </span>
        <Image
          src="/icons/search.svg"
          alt="Search"
          width={18}
          height={18}
          className="animate-bounce"
        />
      </ButtonType>
      <PropertySearchFilter cssClasses="hidden desktop:flex" />
    </div>
  );
};

export default PropertySearchWrapper;
