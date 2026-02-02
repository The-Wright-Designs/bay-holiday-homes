import HeroComponent from "@/_components/pages/properties-page/hero/hero-component";
import PropertyListSuspenseWrapper from "@/_components/pages/properties-page/property-list/property-list-suspense-wrapper";
import PropertyListSorting from "@/_components/pages/properties-page/property-list/property-list-sorting";
import PageWrapper from "@/_lib/utils/page-wrapper";

const PropertiesPage = () => {
  return (
    <div>
      <HeroComponent />
      <PageWrapper>
        <PropertyListSuspenseWrapper />
      </PageWrapper>
    </div>
  );
};

export default PropertiesPage;
