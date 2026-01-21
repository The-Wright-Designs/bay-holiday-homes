import PageWrapper from "@/_lib/utils/page-wrapper";
import HeroComponent from "@/_components/home-page/hero/hero-component";
import MosaicGalleryComponent from "@/_components/home-page/mosaic-gallery/mosaic-gallery-component";
import TestimonialsComponent from "@/_components/home-page/testimonials/testimonials-component";
import TopPropertiesComponent from "@/_components/home-page/top-properties/top-properties-component";
import OurServicesComponent from "@/_components/home-page/our-services/our-services-component";

export default function HomePage() {
  return (
    <div>
      <HeroComponent />
      <PageWrapper>
        <MosaicGalleryComponent />
        <TopPropertiesComponent />
        <TestimonialsComponent />
        <OurServicesComponent />
      </PageWrapper>
    </div>
  );
}
