import PageWrapper from "@/_lib/utils/page-wrapper";
import HeroComponent from "@/_components/pages/home-page/hero/hero-component";
import MosaicGalleryComponent from "@/_components/pages/home-page/mosaic-gallery/mosaic-gallery-component";
import TestimonialsComponent from "@/_components/pages/home-page/testimonials/testimonials-component";
import TopPropertiesComponent from "@/_components/pages/home-page/top-properties/top-properties-component";
import OurServicesComponent from "@/_components/pages/home-page/our-services/our-services-component";
import ContactSectionComponent from "@/_components/pages/home-page/contact/contact-section-component";
import { fetchTestimonials } from "@/_lib/utils/wordpress-api";

export default async function HomePage() {
  const testimonials = await fetchTestimonials();

  return (
    <div>
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
