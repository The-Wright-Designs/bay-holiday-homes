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
import {
  FILTER_PARAM_KEYS,
  PER_PAGE,
} from "@/_lib/utils/property-filter-utils";

const propertiesDescription =
  "Browse our full collection of beachside and bay-side holiday properties in Plettenberg Bay. Houses, apartments and townhouses available.";

type SearchParams = { [key: string]: string | string[] | undefined };

interface PropertiesPageProps {
  searchParams: Promise<SearchParams>;
}

const isFiltered = (params: SearchParams): boolean =>
  FILTER_PARAM_KEYS.some((key) => {
    const value = params[key];
    return Array.isArray(value) ? value.length > 0 : Boolean(value);
  });

const buildCanonical = (currentPage: number, filtered: boolean): string => {
  if (filtered || currentPage <= 1) return "/properties";
  return `/properties?page=${currentPage}`;
};

export async function generateMetadata({
  searchParams,
}: PropertiesPageProps): Promise<Metadata> {
  const params = await searchParams;
  const currentPage = Number(params.page ?? 1);
  const filtered = isFiltered(params);
  const pageSuffix =
    !filtered && currentPage > 1 ? ` — Page ${currentPage}` : "";
  const title = `Holiday Properties for Rent${pageSuffix}`;
  const canonical = buildCanonical(currentPage, filtered);

  return {
    title,
    description: propertiesDescription,
    alternates: { canonical },
    ...(filtered ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      ...sharedOpenGraph,
      title: `${title} | Bay Holiday Homes`,
      description: propertiesDescription,
      url: canonical,
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
  const { properties } = await fetchProperties(1, 100);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Properties", path: "/properties" },
  ]);

  const sortedProperties = [...properties].sort((a, b) =>
    a.title.rendered.localeCompare(b.title.rendered),
  );

  const startPosition = (Math.max(currentPage, 1) - 1) * PER_PAGE + 1;
  const pageProperties = sortedProperties.slice(
    startPosition - 1,
    startPosition - 1 + PER_PAGE,
  );

  return (
    <div>
      <JsonLd
        schema={
          isFiltered(params)
            ? [breadcrumbSchema]
            : [
                buildPropertyListSchema(pageProperties, startPosition),
                breadcrumbSchema,
              ]
        }
      />
      <HeroComponent />
      <PageWrapper>
        <PropertyListSuspenseWrapper
          properties={properties}
          currentPage={currentPage}
        />
      </PageWrapper>
    </div>
  );
};

export default PropertiesPage;
