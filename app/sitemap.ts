import { MetadataRoute } from "next";
import { fetchProperties } from "@/_lib/utils/wordpress-api";

export const revalidate = 900;

const BASE_URL = "https://www.bayholidays.co.za";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${BASE_URL}/properties`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const allProperties = [];
  let page = 1;
  let totalPages = 1;

  do {
    const { properties, totalPages: pages } = await fetchProperties(page, 20);
    allProperties.push(...properties);
    totalPages = pages;
    page++;
  } while (page <= totalPages);

  const propertyRoutes: MetadataRoute.Sitemap = allProperties.map((p) => ({
    url: `${BASE_URL}/properties/${p.meta_box.property_id}`,
    lastModified: p.modified_gmt ? new Date(`${p.modified_gmt}Z`) : undefined,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...propertyRoutes];
}
