import ButtonLink from "@/_components/ui/buttons/button-link";
import { MapPin } from "lucide-react";
import { getAreaLabel } from "@/_lib/utils/area-label-utils";
import PropertyRatesAvailabilityComponent from "@/_components/pages/property-page/property-details/property-rates-availability-component";
import { PropertyProps } from "@/_types/property-types";
import PropertySummaryComponent from "@/_components/pages/property-page/property-details/property-summary-component";
import PropertyDetailedInfoComponent from "@/_components/pages/property-page/property-details/property-detailed-info-component";

interface Props {
  slug: string;
  propertyName: string;
  area: string;
  meta_box: PropertyProps["meta_box"];
}

const PropertyDetailsComponent = ({
  slug,
  propertyName,
  area,
  meta_box,
}: Props) => {
  return (
    <div className="pt-10 grid px-5 gap-10 tablet:px-10 desktop:p-0">
      <ButtonLink
        href={`/properties/${slug}/#enquire`}
        ariaLabel="Enquire about property"
        cssClasses="tablet:hidden"
      >
        Enquire Now
      </ButtonLink>
      <main className="flex flex-col gap-10">
        <div className="border-t border-black/25 pt-5 flex gap-10 justify-between items-center tablet:border-none tablet:pt-0">
          <div className="flex flex-col gap-1">
            <h1 className="uppercase">{propertyName}</h1>
            <div className="flex items-center gap-2">
              <MapPin size={14} color="#3D3D3D" />
              <p>{getAreaLabel(area)}, Plettenberg Bay</p>
            </div>
          </div>
          <ButtonLink
            href={`/properties/${slug}/#enquire`}
            ariaLabel="Enquire about property"
            cssClasses="hidden tablet:block desktop:hidden"
          >
            Enquire Now
          </ButtonLink>
        </div>
        <PropertySummaryComponent meta_box={meta_box} />
        <PropertyRatesAvailabilityComponent
          availableDates={meta_box.bookable_dates}
          pricePerNightFrom={meta_box.price_from}
        />
        <div className="flex flex-col gap-3">
          <h3>Description:</h3>
          <p>{meta_box.description}</p>
        </div>
        <PropertyDetailedInfoComponent meta_box={meta_box} />
      </main>
    </div>
  );
};

export default PropertyDetailsComponent;
