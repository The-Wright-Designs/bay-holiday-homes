import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  fetchAllProperties,
  fetchPropertyById,
} from "@/_lib/utils/wordpress-api";
import { getAreaLabel } from "@/_lib/utils/area-label-utils";
import JsonLd from "@/_components/seo/json-ld";
import {
  buildBreadcrumbSchema,
  buildPropertySchema,
  getTypeLabel,
  sharedOpenGraph,
  sharedTwitter,
  truncate,
} from "@/_lib/utils/structured-data";
import PropertyLightboxSliderComponent from "@/_components/pages/property-page/property-lightbox-slider-component";
import PropertyDetailsComponent from "@/_components/pages/property-page/property-details-component";
import PropertyEnquiryFormWrapper from "@/_components/pages/property-page/property-enquiry-form-wrapper";

const META_DESCRIPTION_MAX = 155;

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const properties = await fetchAllProperties();
  return properties.map((property) => ({ id: property.meta_box.property_id }));
}

export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const { id } = await params;
  const property = await fetchPropertyById(id);
  if (!property) return {};

  const { title, meta_box } = property;
  const bedroomPrefix = meta_box.bedrooms ? `${meta_box.bedrooms} bed, ` : "";
  const specLine = `${bedroomPrefix}${meta_box.baths} bath ${getTypeLabel(meta_box.type).toLowerCase()} in ${getAreaLabel(meta_box.area)} — from R${meta_box.price_from}/night.`;
  const description = truncate(
    `${specLine} ${meta_box.description}`,
    META_DESCRIPTION_MAX,
  );
  const canonical = `/properties/${meta_box.property_id}`;
  const images = meta_box.gallery[0]
    ? [
        {
          url: meta_box.gallery[0].full_url,
          width: 1200,
          height: 630,
          alt: title.rendered,
        },
      ]
    : undefined;

  return {
    title: title.rendered,
    description,
    alternates: { canonical },
    openGraph: {
      ...sharedOpenGraph,
      title: `${title.rendered} | Bay Holiday Homes`,
      description,
      url: canonical,
      ...(images ? { images } : {}),
    },
    twitter: {
      ...sharedTwitter,
      title: `${title.rendered} | Bay Holiday Homes`,
      description,
      ...(meta_box.gallery[0]
        ? { images: [meta_box.gallery[0].full_url] }
        : {}),
    },
  };
}

const PropertyPage = async ({ params }: PropertyPageProps) => {
  const { id } = await params;
  const property = await fetchPropertyById(id);

  if (!property) notFound();

  return (
    <div>
      <JsonLd
        schema={[
          buildPropertySchema(property),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Properties", path: "/properties" },
            {
              name: property.title.rendered,
              path: `/properties/${property.meta_box.property_id}`,
            },
          ]),
        ]}
      />
      <PropertyLightboxSliderComponent
        images={property.meta_box.gallery.map((img) => img.full_url)}
        propertyName={property.title.rendered}
        cssClasses="max-w-[1280px] mx-auto"
      />
      <div className="grid gap-15 max-w-[1280px] mx-auto desktop:gap-10 desktop:grid-cols-2 desktop:pt-10 min-[1360px]:px-0">
        <PropertyDetailsComponent
          id={id}
          propertyName={property.title.rendered}
          area={property.meta_box.area}
          meta_box={property.meta_box}
        />
        <PropertyEnquiryFormWrapper
          propertyName={property.title.rendered}
          propertyId={String(property.id)}
        />
      </div>
    </div>
  );
};

export default PropertyPage;
