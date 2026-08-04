import type { Metadata } from "next";
import PageWrapper from "@/_lib/utils/page-wrapper";
import HeroComponent from "@/_components/pages/home-page/hero/hero-component";
import MosaicGalleryComponent from "@/_components/pages/home-page/mosaic-gallery/mosaic-gallery-component";
import TestimonialsComponent from "@/_components/pages/home-page/testimonials/testimonials-component";
import TopPropertiesComponent from "@/_components/pages/home-page/top-properties/top-properties-component";
import OurServicesComponent from "@/_components/pages/home-page/our-services/our-services-component";
import ContactSectionComponent from "@/_components/pages/home-page/contact/contact-section-component";
import { fetchTestimonials } from "@/_lib/utils/wordpress-api";
import JsonLd from "@/_components/seo/json-ld";
import {
  buildLodgingBusinessSchema,
  buildReviewsSchema,
  buildWebSiteSchema,
  sharedOpenGraph,
  sharedTwitter,
} from "@/_lib/utils/structured-data";

export const revalidate = 900;

const homeDescription =
  "Holiday home rentals and property management in Plettenberg Bay. Browse beachside houses, apartments and townhouses for your coastal getaway.";

export const metadata: Metadata = {
  title: "Holiday Home Rentals in Plettenberg Bay",
  description: homeDescription,
  alternates: { canonical: "/" },
  openGraph: {
    ...sharedOpenGraph,
    title: "Holiday Home Rentals in Plettenberg Bay | Bay Holiday Homes",
    description: homeDescription,
    url: "/",
  },
  twitter: {
    ...sharedTwitter,
    title: "Holiday Home Rentals in Plettenberg Bay | Bay Holiday Homes",
    description: homeDescription,
  },
};

export default async function HomePage() {
  const testimonials = await fetchTestimonials();

  return (
    <div>
      <JsonLd
        schema={[
          buildLodgingBusinessSchema(testimonials),
          buildWebSiteSchema(),
          ...buildReviewsSchema(testimonials),
        ]}
      />
      <HeroComponent />
      <PageWrapper>
        <MosaicGalleryComponent />
        <TopPropertiesComponent />
        <TestimonialsComponent testimonials={testimonials} />
        <OurServicesComponent />
        <ContactSectionComponent />
      </PageWrapper>
    </div>
  );
}
