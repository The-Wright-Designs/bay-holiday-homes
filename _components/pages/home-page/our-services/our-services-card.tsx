"use client";

import Image from "next/image";
import classNames from "classnames";
import { OurServicesCardProps } from "@/_types/our-services-types";

const OurServicesCard = ({
  image,
  heading,
  paragraph,
  flipImage = false,
  vertical = false,
  cssClasses,
}: OurServicesCardProps) => {
  const containerClasses = classNames(
    "bg-teal/25 p-5 gap-5 rounded-[8px] shadow-md w-full flex items-center flex-col",
    cssClasses,
    {
      "desktop:flex-row": !vertical,
      "desktop:flex-row-reverse": flipImage && !vertical,
    },
  );

  return (
    <div className={containerClasses}>
      <div className="relative size-[200px] shrink-0">
        <Image
          src={image}
          alt={heading}
          width={200}
          height={200}
          className="object-cover h-auto"
        />
      </div>
      <div className="flex flex-col gap-3 items-center text-center flex-1">
        <h3>{heading}</h3>
        <p>{paragraph}</p>
      </div>
    </div>
  );
};

export default OurServicesCard;
