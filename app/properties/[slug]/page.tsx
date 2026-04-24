import { notFound } from "next/navigation";
import placeholderData from "@/_data/placeholder-data.json";
import PropertyLightboxSliderComponent from "@/_components/pages/property-page/property-lightbox-slider-component";
import PropertyDetailsComponent from "@/_components/pages/property-page/property-details-component";
import PropertyEnquiryFormWrapper from "@/_components/pages/property-page/property-enquiry-form-wrapper";

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

const PropertyPage = async ({ params }: PropertyPageProps) => {
  const { slug } = await params;
  const property = placeholderData.propertyList.find((p) => p.slug === slug);

  if (!property) notFound();

  return (
    <div>
      <PropertyLightboxSliderComponent
        images={property!.general.images}
        propertyName={property!.general.propertyName}
        cssClasses="max-w-[1280px] mx-auto"
      />
      <div className="grid gap-15 max-w-[1280px] mx-auto desktop:gap-10 desktop:grid-cols-2 desktop:pt-10 min-[1360px]:px-0">
        <PropertyDetailsComponent
          slug={slug}
          propertyName={property!.general.propertyName}
          area={property!.general.area}
          general={property!.general as never}
          specialFeatures={property!.specialFeatures as never}
          parking={property!.parking as never}
          security={property!.security as never}
          wiFi={property!.wiFi as never}
        />
        <PropertyEnquiryFormWrapper propertyName={property!.general.propertyName} propertyId={property!.propertyId} />
      </div>
    </div>
  );
};

export default PropertyPage;
