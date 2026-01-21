import PageWrapper from "@/_lib/utils/page-wrapper";
import HeroComponent from "@/_components/home-page/hero/hero-component";
import MosaicGalleryComponent from "@/_components/home-page/mosaic-gallery/mosaic-gallery-component";
import TestimonialsComponent from "@/_components/home-page/testimonials/testimonials-component";

export default function HomePage() {
  return (
    <div>
      <HeroComponent />
      <PageWrapper cssClasses="mt-15">
        <MosaicGalleryComponent />
        <TestimonialsComponent />
      </PageWrapper>
    </div>
  );
}
