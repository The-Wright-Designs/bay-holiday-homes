import { Suspense } from "react";
import PropertySearchFilter from "./property-search-filter";

interface PropertySearchFilterSuspenseWrapperProps {
  cssClasses?: string;
}

export default function PropertySearchFilterSuspenseWrapper({
  cssClasses,
}: PropertySearchFilterSuspenseWrapperProps) {
  return (
    <Suspense
      fallback={
        <div className="relative gap-[18px] items-end hidden desktop:flex">
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-teal/50 w-[980px] h-[70px]" />
          <div className="spinner z-10" />
        </div>
      }
    >
      <PropertySearchFilter cssClasses={cssClasses} />
    </Suspense>
  );
}
