"use client";

import Image from "next/image";
import classNames from "classnames";

interface PropertyListSortingProps {
  cssClasses?: string;
  resultCount: number;
  onSortChange: (value: string) => void;
}

export default function PropertyListSorting({
  cssClasses,
  resultCount,
  onSortChange,
}: PropertyListSortingProps) {
  return (
    <div
      className={classNames(
        "flex flex-col gap-3 scroll-mt-28 tablet:scroll-mt-32 desktop:scroll-mt-40",
        cssClasses,
      )}
      id="property-search"
    >
      <p className="text-[16px] font-semibold">
        {resultCount} {resultCount === 1 ? "result" : "results"}
      </p>

      <div className="flex items-center gap-1">
        <p className="text-[16px] shrink-0 font-light pr-3">Sort by:</p>

        <div className="relative w-full">
          <select
            className="w-full bg-navy/10 rounded-[2px] pl-2 pr-8 py-2 text-[16px] font-light appearance-none desktop:hover:cursor-pointer"
            defaultValue="a-z"
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="a-z">A-Z</option>
            <option value="price-high-low">Price - High to low</option>
            <option value="price-low-high">Price - Low to high</option>
          </select>

          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
            <Image
              src="/icons/chevron_right.svg"
              alt="Open select box"
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
