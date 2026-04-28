import { Suspense } from "react";
import PropertyListComponent from "./property-list-component";
import { PropertyProps } from "@/_types/property-types";

interface PropertyListSuspenseWrapperProps {
  cssClasses?: string;
  properties: PropertyProps[];
  totalPages: number;
  currentPage: number;
}

export default function PropertyListSuspenseWrapper({
  cssClasses,
  properties,
  totalPages,
  currentPage,
}: PropertyListSuspenseWrapperProps) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="spinner" />
        </div>
      }
    >
      <PropertyListComponent
        cssClasses={cssClasses}
        properties={properties}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </Suspense>
  );
}
