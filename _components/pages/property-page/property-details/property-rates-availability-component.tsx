"use client";

import { useState } from "react";
import ButtonType from "@/_components/ui/buttons/button-type";
import classNames from "classnames";
import { X } from "lucide-react";

interface Props {
  availableDates: { start: string; end: string }[] | null;
  pricePerNightFrom: string;
}

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-ZA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const PropertyRatesAvailabilityComponent = ({
  availableDates,
  pricePerNightFrom,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex flex-col gap-7 desktop:gap-3">
      <div className="w-full flex flex-wrap gap-y-5 items-center gap-x-10 desktop:justify-between">
        <div className="flex flex-col gap-3">
          <h3>Rates &amp; Availability:</h3>
          <p>Starting from: R{pricePerNightFrom} / night</p>
        </div>
        <div
          className={classNames(
            "grid transition-[grid-template-rows] duration-300 ease-in-out",
            {
              "grid-rows-[0fr]": isOpen,
              "grid-rows-[1fr]": !isOpen,
            },
          )}
        >
          <div className="overflow-hidden">
            <ButtonType
              type="button"
              tealStroke
              onClick={() => setIsOpen((prev) => !prev)}
              cssClasses="w-full min-[500px]:w-auto"
            >
              View Bookable Dates
            </ButtonType>
          </div>
        </div>
      </div>
      <div
        className={classNames(
          "grid transition-[grid-template-rows] duration-300 ease-in-out",
          {
            "grid-rows-[1fr]": isOpen,
            "grid-rows-[0fr]": !isOpen,
          },
        )}
      >
        <div className="overflow-hidden">
          <div className="p-5 rounded-xs flex flex-col gap-3 bg-navy">
            <div className="flex justify-between gap-10 items-center">
              <h4 className="text-white">Bookable Dates</h4>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close bookable dates"
                className="p-2 -m-2 desktop:p-0 desktop:m-0 desktop:hover:cursor-pointer desktop:hover:opacity-80 ease-in-out duration-300"
              >
                <X color="#FFFFFF" size={24} />
              </button>
            </div>
            {availableDates && availableDates.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {availableDates.map((date, index) => (
                  <li
                    key={index}
                    className="border-b border-white/15 pb-2 last:border-none last:pb-0"
                  >
                    <p className="text-white">
                      {formatDate(date.start)} &ndash; {formatDate(date.end)}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No bookable dates currently available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyRatesAvailabilityComponent;
