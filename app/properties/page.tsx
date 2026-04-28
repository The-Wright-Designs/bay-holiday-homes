import HeroComponent from "@/_components/pages/properties-page/hero/hero-component";
import PropertyListSuspenseWrapper from "@/_components/pages/properties-page/property-list/property-list-suspense-wrapper";
import PageWrapper from "@/_lib/utils/page-wrapper";
import { fetchProperties } from "@/_lib/utils/wordpress-api";

interface PropertiesPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const PropertiesPage = async ({ searchParams }: PropertiesPageProps) => {
  const params = await searchParams;
  const currentPage = Number(params.page ?? 1);
  const { properties, totalPages } = await fetchProperties(currentPage, 12);

  return (
    <div>
      <HeroComponent />
      <PageWrapper>
        <PropertyListSuspenseWrapper
          properties={properties}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </PageWrapper>
    </div>
  );
};

export default PropertiesPage;
