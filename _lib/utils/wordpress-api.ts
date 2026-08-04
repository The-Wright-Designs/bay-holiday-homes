import { PropertyProps } from "@/_types/property-types";
import { TopProperty } from "@/_types/top-properties-types";
import { Testimonial } from "@/_types/testimonials-types";

const namedEntities: Record<string, string> = {
  amp: "&",
  quot: '"',
  apos: "'",
  lt: "<",
  gt: ">",
  nbsp: " ",
  ndash: "–",
  mdash: "—",
  hellip: "…",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
};

function fromCodePoint(codePoint: number, fallback: string): string {
  if (!Number.isInteger(codePoint) || codePoint < 0 || codePoint > 0x10ffff)
    return fallback;
  return String.fromCodePoint(codePoint);
}

function decodeHtmlEntities(str: string): string {
  return str.replace(/&(#\d+|#x[0-9a-f]+|\w+);/gi, (match, entity: string) => {
    const lowered = entity.toLowerCase();
    if (lowered.startsWith("#x"))
      return fromCodePoint(parseInt(lowered.slice(2), 16), match);
    if (lowered.startsWith("#"))
      return fromCodePoint(Number(lowered.slice(1)), match);
    return namedEntities[lowered] ?? match;
  });
}

function decodeProperty(property: PropertyProps): PropertyProps {
  return {
    ...property,
    title: {
      ...property.title,
      rendered: decodeHtmlEntities(property.title.rendered),
    },
    meta_box: {
      ...property.meta_box,
      description: property.meta_box.description
        ? decodeHtmlEntities(property.meta_box.description)
        : property.meta_box.description,
    },
  };
}

const WP_API_URL =
  "https://wordpress.bayholidays.co.za/wp-json/wp/v2/property";

export async function fetchProperties(
  page = 1,
  perPage = 20
): Promise<{ properties: PropertyProps[]; totalPages: number }> {
  const res = await fetch(
    `${WP_API_URL}?per_page=${perPage}&page=${page}`,
    { next: { revalidate: 900 } }
  );

  if (!res.ok)
    throw new Error(
      `WordPress properties request failed with status ${res.status}`
    );

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
    .map(decodeProperty);

  return { properties, totalPages };
}

export async function fetchPropertyById(
  id: string
): Promise<PropertyProps | null> {
  let property: PropertyProps | null = null;
  let page = 1;
  let totalPages = 1;

  do {
    const res = await fetch(`${WP_API_URL}?per_page=100&page=${page}`, {
      next: { revalidate: 900 },
    });

    if (!res.ok)
      throw new Error(
        `WordPress property request failed with status ${res.status}`
      );

    totalPages = Number(res.headers.get("X-WP-TotalPages") ?? 1);
    const data: PropertyProps[] = await res.json();
    property = data.find((p) => p.meta_box?.property_id === id) ?? null;
    page++;
  } while (!property && page <= totalPages);

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
  return decodeProperty(property);
}

export async function fetchTopProperties(): Promise<TopProperty[]> {
  const res = await fetch(
    "https://wordpress.bayholidays.co.za/wp-json/wp/v2/top_property",
    { next: { revalidate: 900 } }
  );
  if (!res.ok)
    throw new Error(
      `WordPress top properties request failed with status ${res.status}`
    );
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
    { next: { revalidate: 900 } }
  );
  if (!res.ok)
    throw new Error(
      `WordPress testimonials request failed with status ${res.status}`
    );
  const data: Testimonial[] = await res.json();
  return data
    .filter(
      (t) =>
        t.meta_box?.type &&
        t.meta_box?.testimonial &&
        t.meta_box?.author &&
        t.meta_box?.stars
    )
    .map((t) => ({
      ...t,
      meta_box: {
        ...t.meta_box,
        testimonial: decodeHtmlEntities(t.meta_box.testimonial),
        author: decodeHtmlEntities(t.meta_box.author),
      },
    }));
}
