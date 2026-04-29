import type { Metadata } from "next";
import OurSalesDivisionComponent from "@/_components/pages/about-us-page/our-sales-division-component";
import OurStoryComponent from "@/_components/pages/about-us-page/our-story-component";
import OurTeamComponent from "@/_components/pages/about-us-page/our-team-component";
import PageWrapper from "@/_lib/utils/page-wrapper";

export const metadata: Metadata = {
  title: "About Us | Bay Holiday Homes",
  description:
    "Meet the Bay Holiday Homes team — local experts in Plettenberg Bay holiday rentals and coastal property management.",
  openGraph: {
    title: "About Us | Bay Holiday Homes",
    description:
      "Meet the Bay Holiday Homes team — local experts in Plettenberg Bay holiday rentals and coastal property management.",
  },
};

const AboutUsPage = () => {
  return (
    <PageWrapper>
      <OurStoryComponent />
      <OurTeamComponent />
      <OurSalesDivisionComponent />
    </PageWrapper>
  );
};

export default AboutUsPage;
