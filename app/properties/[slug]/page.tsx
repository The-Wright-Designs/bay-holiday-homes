import { notFound } from "next/navigation";
import placeholderData from "@/_data/placeholder-data.json";
import PropertyLightboxSliderComponent from "@/_components/pages/property-page/property-lightbox-slider-component";
import PropertyDetailsComponent from "@/_components/pages/property-page/property-details-component";

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
    </div>
  );
};

export default PropertyPage;
