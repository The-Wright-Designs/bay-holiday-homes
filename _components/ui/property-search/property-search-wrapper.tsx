"use client";

import ButtonType from "@/_components/ui/buttons/button-type";
import Image from "next/image";
import PropertySearchFilterSuspenseWrapper from "./property-search-filter-suspense-wrapper";
import classNames from "classnames";

interface PropertySearchWrapperProps {
  cssClasses?: string;
  tealButton?: boolean;
}

const PropertySearchWrapper = ({
  cssClasses,
  tealButton,
}: PropertySearchWrapperProps) => {
  return (
    <div className={cssClasses}>
      <ButtonType
        type="button"
        colorWhite={tealButton ? false : true}
        cssClasses="flex items-center gap-3 desktop:hidden"
      >
        <span
          className={classNames(
            "text-[16px] font-light",
            tealButton ? "text-white" : "text-navy",
          )}
        >
          Property Search
        </span>
        <Image
          src={`/icons/search${tealButton ? "-white" : ""}.svg`}
          alt="Search"
          width={18}
          height={18}
          className="animate-bounce"
        />
      </ButtonType>
      <PropertySearchFilterSuspenseWrapper cssClasses="hidden desktop:flex" />
    </div>
  );
};

export default PropertySearchWrapper;
