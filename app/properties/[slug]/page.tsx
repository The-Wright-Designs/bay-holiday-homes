import { notFound } from "next/navigation";
import placeholderData from "@/_data/placeholder-data.json";
import PageWrapper from "@/_lib/utils/page-wrapper";
import PropertyLightboxSliderComponent from "@/_components/pages/property-page/property-lightbox-slider-component";

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
    </div>
  );
};

export default PropertyPage;
