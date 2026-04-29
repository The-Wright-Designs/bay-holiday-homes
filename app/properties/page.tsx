import type { Metadata } from "next";
import HeroComponent from "@/_components/pages/properties-page/hero/hero-component";
import PropertyListSuspenseWrapper from "@/_components/pages/properties-page/property-list/property-list-suspense-wrapper";
import PageWrapper from "@/_lib/utils/page-wrapper";
import { fetchProperties } from "@/_lib/utils/wordpress-api";

export const metadata: Metadata = {
  title: "Holiday Properties for Rent | Bay Holiday Homes",
  description:
    "Browse our full collection of beachside and bay-side holiday properties in Plettenberg Bay. Houses, apartments and townhouses available.",
  openGraph: {
    title: "Holiday Properties for Rent | Bay Holiday Homes",
    description:
      "Browse our full collection of beachside and bay-side holiday properties in Plettenberg Bay. Houses, apartments and townhouses available.",
  },
};

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
