import ButtonLink from "@/_components/ui/buttons/button-link";
import ButtonType from "@/_components/ui/buttons/button-type";
import { MapPin } from "lucide-react";
import { PropertyProps } from "@/_types/property-types";
import PropertySummaryComponent from "@/_components/pages/property-page/property-details/property-summary-component";
import PropertyDetailedInfoComponent from "@/_components/pages/property-page/property-details/property-detailed-info-component";

interface Props {
  slug: string;
  propertyName: string;
  area: string;
  general: PropertyProps["general"];
  specialFeatures: PropertyProps["specialFeatures"];
  parking: PropertyProps["parking"];
  security: PropertyProps["security"];
  wiFi: PropertyProps["wiFi"];
}

const PropertyDetailsComponent = ({
  slug,
  propertyName,
  area,
  general,
  specialFeatures,
  parking,
  security,
  wiFi,
}: Props) => {
  return (
    <div className="py-10 px-5 grid gap-10 max-w-[1280px] mx-auto tablet:px-10 desktop:grid-cols-2 min-[1360px]:px-0">
      <ButtonLink
        href={`/${slug}/#enquire`}
        ariaLabel="Enquire about property"
        cssClasses="tablet:hidden"
      >
        Enquire Now
      </ButtonLink>
      <main className="flex flex-col gap-10">
        <div className="border-t border-black/25 pt-5 flex gap-10 justify-between items-center desktop:border-none desktop:pt-0">
          <div className="flex flex-col gap-1">
            <h1 className="uppercase">{propertyName}</h1>
            <div className="flex items-center gap-2">
              <MapPin size={14} color="#3D3D3D" />
              <p>
                {area === "Keurbooms River, Beach & Lagoon"
                  ? "Keurbooms"
                  : area}
                , Plettenberg Bay
              </p>
            </div>
          </div>
          <ButtonLink
            href={`/${slug}/#enquire`}
            ariaLabel="Enquire about property"
            cssClasses="hidden tablet:block desktop:hidden"
          >
            Enquire Now
          </ButtonLink>
        </div>
        <PropertySummaryComponent
          general={general}
          specialFeatures={specialFeatures}
        />
        <div className="w-full flex flex-col gap-5 tablet:flex-row tablet:gap-10 tablet:items-center desktop:justify-between">
          <div className="flex flex-col gap-3">
            <h3>Rates &amp; Availability:</h3>
            <p>Starting from: R{general.pricePerNight.from} / night</p>
          </div>
          <ButtonType type="button" tealStroke>
            View Bookable Dates
          </ButtonType>
        </div>
        <div className="flex flex-col gap-3">
          <h3>Description:</h3>
          <p>{general.description}</p>
        </div>
        <PropertyDetailedInfoComponent
          general={general}
          parking={parking}
          security={security}
          wiFi={wiFi}
        />
      </main>
      <div>f</div>
    </div>
  );
};

export default PropertyDetailsComponent;
