import PageWrapper from "@/_lib/utils/page-wrapper";
import HeroComponent from "@/_components/pages/home-page/hero/hero-component";
import MosaicGalleryComponent from "@/_components/pages/home-page/mosaic-gallery/mosaic-gallery-component";
import TestimonialsComponent from "@/_components/pages/home-page/testimonials/testimonials-component";
import TopPropertiesComponent from "@/_components/pages/home-page/top-properties/top-properties-component";
import OurServicesComponent from "@/_components/pages/home-page/our-services/our-services-component";
import ContactSectionComponent from "@/_components/pages/home-page/contact/contact-section-component";

export default function HomePage() {
  return (
    <div>
      <HeroComponent />
      <PageWrapper>
        <MosaicGalleryComponent />
        <TopPropertiesComponent />
        <TestimonialsComponent />
        <OurServicesComponent />
        <ContactSectionComponent />
      </PageWrapper>
    </div>
  );
}
