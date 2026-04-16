"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import {
  WavesLadder,
  Baby,
  PawPrint,
  Accessibility,
  Shrub,
} from "lucide-react";
import { PropertyProps } from "@/_types/property-types";

interface PropertyCardProps {
  slug: string;
  property: PropertyProps;
  cssClasses?: string;
}

export default function PropertyCard({
  slug,
  property,
  cssClasses,
}: PropertyCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const { general, specialFeatures } = property;

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("en-ZA").format(Number(price));
  };

  return (
    <Link
      href={`/properties/${slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={classNames(
        "flex flex-col overflow-clip rounded-[2px] drop-shadow-md desktop:hover:cursor-pointer",
        cssClasses,
      )}
    >
      <div className="relative aspect-[4/2.6] w-full shrink-0 overflow-hidden">
        <Image
          src={general.images[0]}
          alt={general.propertyName}
          fill
          className={classNames(
            "object-cover ease-in-out duration-500 delay-150",
            { "desktop:scale-[103%]": isHovered },
          )}
          sizes="(max-width: 800px) 100vw, 50vw"
        />
        <p className="absolute text-[14px] top-5 right-5 py-1.5 px-2.5 rounded-[2px] bg-teal text-white">
          {general.area
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase())}
        </p>
      </div>

      <div
        className={classNames(
          "flex flex-col gap-5 p-5 w-full ease-in-out duration-500 delay-75",
          isHovered ? "desktop:bg-navy/5" : "bg-white",
        )}
      >
        <div className="flex gap-3 items-center w-full">
          <div className="flex flex-col flex-1 min-w-0">
            <p className="text-[18px] font-semibold">
              {general.type
                .replace(/-/g, "/")
                .replace(/\b\w/g, (c) => c.toUpperCase())}
            </p>
            <p className="text-[14px] font-light">
              {general.propertyName.replace(/\b\w/g, (c) => c.toUpperCase())}
            </p>
          </div>

          <div className="flex flex-col flex-1 min-w-0 items-end tablet:items-start">
            <p className="font-light text-[14px]">Starting from:</p>
            <p className="font-semibold text-[14px]">
              R{formatPrice(general.pricePerNight.from)} / night
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full">
          <div className="flex gap-1.5 items-center">
            <Image
              src="/icons/listings/bed.svg"
              alt="Bedrooms"
              width={20}
              height={20}
            />
            <p className="text-[14px] font-light">
              {general.beds}{" "}
              {Number(general.beds) === 1 ? "bedroom" : "bedrooms"}
            </p>
          </div>

          <div className="flex gap-1.5 items-center">
            <Image
              src="/icons/listings/bath.svg"
              alt="Bathrooms"
              width={20}
              height={20}
            />
            <p className="text-[14px] font-light">
              {general.baths}{" "}
              {Number(general.baths) === 1 ? "bathroom" : "bathrooms"}
            </p>
          </div>

          {specialFeatures?.directBeachAccess && (
            <div className="flex gap-1.5 items-center">
              <Image
                src="/icons/listings/surfing.svg"
                alt="Beach access"
                width={20}
                height={20}
              />
              <p className="text-[14px] font-light">Beach access</p>
            </div>
          )}

          {specialFeatures && Number(specialFeatures.pool.numberOf) > 0 && (
            <div className="flex gap-1.5 items-center">
              <WavesLadder size={20} color="#4AB5BB" />
              <p className="text-[14px] font-light">Pool</p>
            </div>
          )}

          {specialFeatures?.childFriendly && (
            <div className="flex gap-1.5 items-center">
              <Baby size={20} color="#4AB5BB" />
              <p className="text-[14px] font-light">Child friendly</p>
            </div>
          )}

          {specialFeatures?.petFriendly && (
            <div className="flex gap-1.5 items-center">
              <PawPrint size={20} color="#4AB5BB" />
              <p className="text-[14px] font-light">Pet friendly</p>
            </div>
          )}

          {specialFeatures?.wheelChairFriendly && (
            <div className="flex gap-1.5 items-center">
              <Accessibility size={20} color="#4AB5BB" />
              <p className="text-[14px] font-light">Wheelchair accessible</p>
            </div>
          )}

          {specialFeatures?.hotTub && (
            <div className="flex gap-1.5 items-center">
              <Image
                src="/icons/listings/hot-tub.svg"
                alt="Hot tub"
                width={20}
                height={20}
              />
              <p className="text-[14px] font-light">Hot tub</p>
            </div>
          )}

          {specialFeatures?.sauna && (
            <div className="flex gap-1.5 items-center">
              <Image
                src="/icons/listings/sauna.svg"
                alt="Sauna"
                width={20}
                height={20}
              />
              <p className="text-[14px] font-light">Sauna</p>
            </div>
          )}

          {specialFeatures?.view.ocean && (
            <div className="flex gap-1.5 items-center">
              <Image
                src="/icons/listings/ocean.svg"
                alt="Ocean view"
                width={20}
                height={20}
              />
              <p className="text-[14px] font-light">Ocean view</p>
            </div>
          )}

          {specialFeatures?.view.mountain && (
            <div className="flex gap-1.5 items-center">
              <Image
                src="/icons/listings/mountain.svg"
                alt="Mountain view"
                width={20}
                height={20}
              />
              <p className="text-[14px] font-light">Mountain view</p>
            </div>
          )}

          {specialFeatures?.view.lagoon && (
            <div className="flex gap-1.5 items-center">
              <Image
                src="/icons/listings/lagoon.svg"
                alt="Lagoon view"
                width={20}
                height={20}
              />
              <p className="text-[14px] font-light">Lagoon view</p>
            </div>
          )}

          {specialFeatures?.view.fynbos && (
            <div className="flex gap-1.5 items-center">
              <Shrub size={20} color="#4AB5BB" />
              <p className="text-[14px] font-light">Fynbos view</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
