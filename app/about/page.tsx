import type { Metadata } from "next";
import OurSalesDivisionComponent from "@/_components/pages/about-us-page/our-sales-division-component";
import OurStoryComponent from "@/_components/pages/about-us-page/our-story-component";
import OurTeamComponent from "@/_components/pages/about-us-page/our-team-component";
import PageWrapper from "@/_lib/utils/page-wrapper";
import {
  sharedOpenGraph,
  sharedTwitter,
} from "@/_lib/utils/structured-data";

const aboutDescription =
  "Meet the Bay Holiday Homes team — local experts in Plettenberg Bay holiday rentals and coastal property management.";

export const metadata: Metadata = {
  title: "About Us",
  description: aboutDescription,
  alternates: { canonical: "/about" },
  openGraph: {
    ...sharedOpenGraph,
    title: "About Us | Bay Holiday Homes",
    description: aboutDescription,
    url: "/about",
  },
  twitter: {
    ...sharedTwitter,
    title: "About Us | Bay Holiday Homes",
    description: aboutDescription,
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
