import type { Metadata } from "next";
import HeroComponent from "@/_components/pages/properties-page/hero/hero-component";
import PropertyListSuspenseWrapper from "@/_components/pages/properties-page/property-list/property-list-suspense-wrapper";
import PageWrapper from "@/_lib/utils/page-wrapper";
import { fetchProperties } from "@/_lib/utils/wordpress-api";
import JsonLd from "@/_components/seo/json-ld";
import {
  buildBreadcrumbSchema,
  buildPropertyListSchema,
  sharedOpenGraph,
  sharedTwitter,
} from "@/_lib/utils/structured-data";

const propertiesDescription =
  "Browse our full collection of beachside and bay-side holiday properties in Plettenberg Bay. Houses, apartments and townhouses available.";

interface PropertiesPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  searchParams,
}: PropertiesPageProps): Promise<Metadata> {
  const params = await searchParams;
  const currentPage = Number(params.page ?? 1);
  const pageSuffix = currentPage > 1 ? ` — Page ${currentPage}` : "";
  const title = `Holiday Properties for Rent${pageSuffix}`;

  return {
    title,
    description: propertiesDescription,
    alternates: { canonical: "/properties" },
    openGraph: {
      ...sharedOpenGraph,
      title: `${title} | Bay Holiday Homes`,
      description: propertiesDescription,
      url: "/properties",
    },
    twitter: {
      ...sharedTwitter,
      title: `${title} | Bay Holiday Homes`,
      description: propertiesDescription,
    },
  };
}

const PropertiesPage = async ({ searchParams }: PropertiesPageProps) => {
  const params = await searchParams;
  const currentPage = Number(params.page ?? 1);
  const { properties, totalPages } = await fetchProperties(currentPage, 12);

  return (
    <div>
      <JsonLd
        schema={[
          buildPropertyListSchema(properties),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Properties", path: "/properties" },
          ]),
        ]}
      />
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
