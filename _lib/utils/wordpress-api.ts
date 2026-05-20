import { PropertyProps } from "@/_types/property-types";
import { TopProperty } from "@/_types/top-properties-types";
import { Testimonial } from "@/_types/testimonials-types";

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

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
  const data: PropertyProps[] = await res.json();

  const properties = data
    .filter(
      (p) =>
        p.title?.rendered &&
        p.meta_box?.gallery?.length > 0 &&
        p.meta_box?.type &&
        p.meta_box?.area &&
        p.meta_box?.beds &&
        p.meta_box?.baths &&
        p.meta_box?.price_from
    )
    .map((p) => ({
      ...p,
      title: { ...p.title, rendered: decodeHtmlEntities(p.title.rendered) },
    }));

  return { properties, totalPages };
}

export async function fetchPropertyById(
  id: string
): Promise<PropertyProps | null> {
  const res = await fetch(
    `${WP_API_URL}?per_page=100`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) return null;

  const data: PropertyProps[] = await res.json();
  const property = data.find((p) => p.meta_box.property_id === id) ?? null;
  if (
    !property ||
    !property.title?.rendered ||
    !property.meta_box?.gallery?.length ||
    !property.meta_box?.type ||
    !property.meta_box?.area ||
    !property.meta_box?.beds ||
    !property.meta_box?.baths ||
    !property.meta_box?.price_from ||
    !property.meta_box?.description ||
    property.meta_box?.bookable_dates === undefined
  )
    return null;
  return {
    ...property,
    title: { ...property.title, rendered: decodeHtmlEntities(property.title.rendered) },
  };
}

export async function fetchTopProperties(): Promise<TopProperty[]> {
  const res = await fetch(
    "https://wordpress.bayholidays.co.za/wp-json/wp/v2/top_property",
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  const data: TopProperty[] = await res.json();
  return data
    .filter(
      (p) =>
        p.meta_box?.top_property_id &&
        p.meta_box?.title &&
        p.meta_box?.image?.full_url
    )
    .map((p) => ({
      ...p,
      meta_box: { ...p.meta_box, title: decodeHtmlEntities(p.meta_box.title) },
    }));
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const res = await fetch(
    "https://wordpress.bayholidays.co.za/wp-json/wp/v2/testimonial",
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  const data: Testimonial[] = await res.json();
  return data.filter(
    (t) =>
      t.meta_box?.type &&
      t.meta_box?.testimonial &&
      t.meta_box?.author &&
      t.meta_box?.stars
  );
}
