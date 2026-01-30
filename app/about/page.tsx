import OurStoryComponent from "@/_components/about-us-page/our-story-component";
import OurTeamComponent from "@/_components/about-us-page/our-team-component";
import PageWrapper from "@/_lib/utils/page-wrapper";

const AboutUsPage = () => {
  return (
    <PageWrapper>
      <OurStoryComponent />
      <OurTeamComponent />
    </PageWrapper>
  );
};

export default AboutUsPage;
