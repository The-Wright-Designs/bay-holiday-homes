import generalData from "@/_data/general-data.json";
import { getAreaLabel } from "@/_lib/utils/area-label-utils";
import { PropertyProps } from "@/_types/property-types";
import { Testimonial } from "@/_types/testimonials-types";

export const SITE_URL = "https://www.bayholidays.co.za";

export const DEFAULT_OG_IMAGE = {
  url: "/open-graph-image.webp",
  width: 1200,
  height: 630,
  alt: "Bay Holiday Homes",
};

export const sharedOpenGraph = {
  type: "website" as const,
  locale: "en_ZA",
  siteName: "Bay Holiday Homes",
  images: [DEFAULT_OG_IMAGE],
};

export const sharedTwitter = {
  card: "summary_large_image" as const,
  images: [DEFAULT_OG_IMAGE.url],
};

const ORGANISATION_ID = `${SITE_URL}/#organisation`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const businessAddress = {
  "@type": "PostalAddress",
  streetAddress: "5 Gibb Street",
  addressLocality: "Plettenberg Bay",
  addressRegion: "Western Cape",
  postalCode: "6600",
  addressCountry: "ZA",
};

export const getTypeLabel = (typeValue: string): string =>
  generalData.propertySearch.propertyType.find((t) => t.value === typeValue)
    ?.label ?? typeValue;

export function buildLodgingBusinessSchema(testimonials: Testimonial[] = []) {
  const { contact } = generalData;

  const ratings = testimonials
    .map((t) => Number(t.meta_box.stars))
    .filter((stars) => Number.isFinite(stars) && stars > 0);

  const aggregateRating =
    ratings.length > 0
      ? {
          "@type": "AggregateRating",
          ratingValue: (
            ratings.reduce((sum, stars) => sum + stars, 0) / ratings.length
          ).toFixed(1),
          reviewCount: ratings.length,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": ORGANISATION_ID,
    name: "Bay Holiday Homes",
    description:
      "Beach and bay-side holiday properties - coastal getaway accommodation in Plettenberg Bay, South Africa.",
    url: SITE_URL,
    telephone: contact.phone,
    email: contact.email,
    image: `${SITE_URL}/open-graph-image.webp`,
    logo: `${SITE_URL}/logos/bay-holiday-homes-logo.png`,
    priceRange: "R$$",
    address: businessAddress,
    areaServed: {
      "@type": "Place",
      name: "Plettenberg Bay, Western Cape, South Africa",
    },
    sameAs: [contact.social.facebook, contact.social.whatsapp],
    ...(aggregateRating ? { aggregateRating } : {}),
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: "Bay Holiday Homes",
    inLanguage: "en-ZA",
    publisher: { "@id": ORGANISATION_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/properties?area={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildReviewsSchema(testimonials: Testimonial[]) {
  return testimonials.map((t) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@id": ORGANISATION_ID },
    author: { "@type": "Person", name: t.meta_box.author },
    reviewBody: t.meta_box.testimonial,
    reviewRating: {
      "@type": "Rating",
      ratingValue: t.meta_box.stars,
      bestRating: 5,
      worstRating: 1,
    },
  }));
}

function buildAmenities(meta_box: PropertyProps["meta_box"]) {
  const amenities: { name: string; value: boolean }[] = [];

  if (Number(meta_box.pool_number_of ?? "0") > 0)
    amenities.push({ name: "Swimming pool", value: true });
  if (meta_box.wifi_type) amenities.push({ name: "WiFi", value: true });
  if (meta_box.braai?.length) amenities.push({ name: "Braai", value: true });
  if (meta_box.fireplace?.length)
    amenities.push({ name: "Fireplace", value: true });
  if (meta_box.special_features?.includes("child_friendly"))
    amenities.push({ name: "Child friendly", value: true });
  if (meta_box.special_features?.includes("pet_friendly"))
    amenities.push({ name: "Pet friendly", value: true });
  if (meta_box.special_features?.includes("wheel_chair_friendly"))
    amenities.push({ name: "Wheelchair accessible", value: true });
  if (meta_box.special_features?.includes("direct_beach_access"))
    amenities.push({ name: "Direct beach access", value: true });
  if (meta_box.pool_other?.includes("hot_tub"))
    amenities.push({ name: "Hot tub", value: true });
  if (meta_box.pool_other?.includes("jaccuzi"))
    amenities.push({ name: "Jacuzzi", value: true });
  if (meta_box.pool_other?.includes("sauna"))
    amenities.push({ name: "Sauna", value: true });
  if (meta_box.tv?.length) amenities.push({ name: "TV", value: true });

  return amenities.map((amenity) => ({
    "@type": "LocationFeatureSpecification",
    ...amenity,
  }));
}

export function buildPropertySchema(property: PropertyProps) {
  const { title, meta_box } = property;
  const url = `${SITE_URL}/properties/${meta_box.property_id}`;
  const amenities = buildAmenities(meta_box);

  return {
    "@context": "https://schema.org",
    "@type": "Accommodation",
    "@id": url,
    name: title.rendered,
    description: meta_box.description,
    url,
    accommodationCategory: getTypeLabel(meta_box.type),
    numberOfBedrooms: Number(meta_box.beds),
    numberOfBathroomsTotal: Number(meta_box.baths),
    image: meta_box.gallery.map((image) => image.full_url),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Plettenberg Bay",
      addressRegion: "Western Cape",
      addressCountry: "ZA",
    },
    containedInPlace: {
      "@type": "Place",
      name: `${getAreaLabel(meta_box.area)}, Plettenberg Bay`,
    },
    ...(amenities.length > 0 ? { amenityFeature: amenities } : {}),
    provider: { "@id": ORGANISATION_ID },
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/#enquire`,
      },
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "ZAR",
      price: Number(meta_box.price_from),
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceCurrency: "ZAR",
        price: Number(meta_box.price_from),
        unitCode: "DAY",
      },
      availability: "https://schema.org/InStock",
      url,
    },
  };
}

export function buildBreadcrumbSchema(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function buildPropertyListSchema(properties: PropertyProps[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Holiday Properties for Rent in Plettenberg Bay",
    numberOfItems: properties.length,
    itemListElement: properties.map((property, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/properties/${property.meta_box.property_id}`,
      name: property.title.rendered,
    })),
  };
}
