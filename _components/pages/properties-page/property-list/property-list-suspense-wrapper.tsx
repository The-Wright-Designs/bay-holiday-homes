import { Suspense } from "react";
import PropertyListComponent from "./property-list-component";

interface PropertyListSuspenseWrapperProps {
  cssClasses?: string;
}

export default function PropertyListSuspenseWrapper({
  cssClasses,
}: PropertyListSuspenseWrapperProps) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="spinner" />
        </div>
      }
    >
      <PropertyListComponent cssClasses={cssClasses} />
    </Suspense>
  );
}
