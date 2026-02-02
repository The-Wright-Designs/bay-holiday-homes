import OurSalesDivisionComponent from "@/_components/pages/about-us-page/our-sales-division-component";
import OurStoryComponent from "@/_components/pages/about-us-page/our-story-component";
import OurTeamComponent from "@/_components/pages/about-us-page/our-team-component";
import PageWrapper from "@/_lib/utils/page-wrapper";

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
