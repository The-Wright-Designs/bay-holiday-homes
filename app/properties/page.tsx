import HeroComponent from "@/_components/pages/properties-page/hero/hero-component";
import PropertyListComponent from "@/_components/pages/properties-page/property-list/property-list-component";
import PropertyListSorting from "@/_components/pages/properties-page/property-list/property-list-sorting";
import PageWrapper from "@/_lib/utils/page-wrapper";

const PropertiesPage = () => {
  return (
    <div>
      <HeroComponent />
      <PageWrapper>
        <PropertyListComponent />
      </PageWrapper>
    </div>
  );
};

export default PropertiesPage;
