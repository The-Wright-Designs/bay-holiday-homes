import PageWrapper from "@/_lib/utils/page-wrapper";
import HeroComponent from "@/_components/home-page/hero/hero-component";
import ButtonType from "@/_components/ui/buttons/button-type";

export default function HomePage() {
  return (
    <div>
      {/* <HeroComponent /> */}
      <PageWrapper>
        <h1>Heading</h1>
        <h3>Subheading</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <ButtonType type="submit" navyStroke>
          Submit
        </ButtonType>
      </PageWrapper>
    </div>
  );
}
