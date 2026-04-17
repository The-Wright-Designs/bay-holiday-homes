import { Suspense } from "react";
import MobilePropertySearchFilter from "./mobile-property-search-filter";

interface MobilePropertySearchFilterSuspenseWrapperProps {
  cssClasses?: string;
  tealButton?: boolean;
}

export default function MobilePropertySearchFilterSuspenseWrapper({
  cssClasses,
  tealButton,
}: MobilePropertySearchFilterSuspenseWrapperProps) {
  return (
    <Suspense fallback={null}>
      <MobilePropertySearchFilter cssClasses={cssClasses} tealButton={tealButton} />
    </Suspense>
  );
}
