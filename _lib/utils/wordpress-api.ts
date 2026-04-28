import { PropertyProps } from "@/_types/property-types";
import { TopProperty } from "@/_types/top-properties-types";

const WP_API_URL =
  "https://wordpress.bayholidays.co.za/wp-json/wp/v2/property";

export async function fetchProperties(
  page = 1,
  perPage = 20
): Promise<{ properties: PropertyProps[]; totalPages: number }> {
  const res = await fetch(
    `${WP_API_URL}?per_page=${perPage}&page=${page}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) return { properties: [], totalPages: 1 };

  const totalPages = Number(res.headers.get("X-WP-TotalPages") ?? 1);
  const properties: PropertyProps[] = await res.json();

  return { properties, totalPages };
}

export async function fetchPropertyById(
  id: string
): Promise<PropertyProps | null> {
  const res = await fetch(
    `${WP_API_URL}?meta_key=property_id&meta_value=${id}&per_page=1`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) return null;

  const data: PropertyProps[] = await res.json();
  return data[0] ?? null;
}

export async function fetchTopProperties(): Promise<TopProperty[]> {
  const res = await fetch(
    "https://wordpress.bayholidays.co.za/wp-json/wp/v2/top_property",
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  return res.json();
}
