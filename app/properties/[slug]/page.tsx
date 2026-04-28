import { notFound } from "next/navigation";
import { fetchPropertyBySlug } from "@/_lib/utils/wordpress-api";
import PropertyLightboxSliderComponent from "@/_components/pages/property-page/property-lightbox-slider-component";
import PropertyDetailsComponent from "@/_components/pages/property-page/property-details-component";
import PropertyEnquiryFormWrapper from "@/_components/pages/property-page/property-enquiry-form-wrapper";

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

const PropertyPage = async ({ params }: PropertyPageProps) => {
  const { slug } = await params;
  const property = await fetchPropertyBySlug(slug);

  if (!property) notFound();

  return (
    <div>
      <PropertyLightboxSliderComponent
        images={property.meta_box.gallery.map((img) => img.full_url)}
        propertyName={property.title.rendered}
        cssClasses="max-w-[1280px] mx-auto"
      />
      <div className="grid gap-15 max-w-[1280px] mx-auto desktop:gap-10 desktop:grid-cols-2 desktop:pt-10 min-[1360px]:px-0">
        <PropertyDetailsComponent
          slug={slug}
          propertyName={property.title.rendered}
          area={property.meta_box.area}
          meta_box={property.meta_box}
        />
        <PropertyEnquiryFormWrapper propertyName={property.title.rendered} propertyId={String(property.id)} />
      </div>
    </div>
  );
};

export default PropertyPage;
