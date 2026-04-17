import PropertySearchFilterSuspenseWrapper from "./property-search-filter-suspense-wrapper";
import MobilePropertySearchFilterSuspenseWrapper from "./mobile/mobile-property-search-filter-suspense-wrapper";

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
      <MobilePropertySearchFilterSuspenseWrapper
        tealButton={tealButton}
        cssClasses="desktop:hidden"
      />
      <PropertySearchFilterSuspenseWrapper cssClasses="hidden desktop:flex" />
    </div>
  );
};

export default PropertySearchWrapper;
