import { PropertyProps } from "@/_types/property-types";

export const PER_PAGE = 12;

export const FILTER_PARAM_KEYS = [
  "propertyType",
  "area",
  "budget",
  "bedrooms",
  "extras",
] as const;

export interface PropertyFilterState {
  propertyType: string[];
  area: string[];
  budget: string;
  bedrooms: string;
  extras: string[];
}

export const getFiltersFromSearchParams = (
  searchParams: URLSearchParams,
): PropertyFilterState => ({
  propertyType: searchParams.getAll("propertyType"),
  area: searchParams.getAll("area"),
  budget: searchParams.get("budget") || "",
  bedrooms: searchParams.get("bedrooms") || "",
  extras: searchParams.getAll("extras"),
});

export const buildFilterUrl = (filters: PropertyFilterState): string => {
  const params = new URLSearchParams();

  filters.propertyType.forEach((v) => params.append("propertyType", v));
  filters.area.forEach((v) => params.append("area", v));
  if (filters.budget) params.append("budget", filters.budget);
  if (filters.bedrooms) params.append("bedrooms", filters.bedrooms);
  filters.extras.forEach((v) => params.append("extras", v));

  const queryString = params.toString();
  return queryString
    ? `/properties?${queryString}#property-search`
    : "/properties#property-search";
};

const matchesBudget = (priceFrom: string, budgetRange: string): boolean => {
  const price = Number(priceFrom);
  if (budgetRange === "0-5000") return price >= 0 && price <= 5000;
  if (budgetRange === "5000-10000") return price >= 5000 && price <= 10000;
  if (budgetRange === "10000+") return price >= 10000;
  return true;
};

const matchesBedrooms = (bedrooms: string, bedroomRange: string): boolean => {
  const count = Number(bedrooms);
  if (bedroomRange === "1-2") return count >= 1 && count <= 2;
  if (bedroomRange === "3-4") return count >= 3 && count <= 4;
  if (bedroomRange === "5+") return count >= 5;
  return true;
};

const matchesExtra = (extra: string, property: PropertyProps): boolean => {
  const { meta_box } = property;
  if (!meta_box) return false;
  if (extra === "childFriendly") return meta_box.special_features?.includes("child_friendly") ?? false;
  if (extra === "petFriendly") return meta_box.special_features?.includes("pet_friendly") ?? false;
  if (extra === "easyAccess") return meta_box.special_features?.includes("easy_access") ?? false;
  if (extra === "directBeachAccess") return meta_box.special_features?.includes("direct_beach_access") ?? false;
  if (extra === "pool") return Number(meta_box.pool_number_of ?? "0") > 0;
  if (extra === "hotTub") return meta_box.pool_other?.includes("hot_tub") ?? false;
  if (extra === "sauna") return meta_box.pool_other?.includes("sauna") ?? false;
  if (extra === "oceanView") return meta_box.view?.includes("ocean") ?? false;
  if (extra === "mountainView") return meta_box.view?.includes("mountain") ?? false;
  if (extra === "lagoonView") return meta_box.view?.includes("lagoon") ?? false;
  if (extra === "gardenView") return meta_box.view?.includes("garden") ?? false;
  return false;
};

export const filterProperties = (
  properties: PropertyProps[],
  searchParams: URLSearchParams,
): PropertyProps[] => {
  const propertyTypes = searchParams.getAll("propertyType");
  const areas = searchParams.getAll("area");
  const budget = searchParams.get("budget");
  const bedrooms = searchParams.get("bedrooms");
  const extras = searchParams.getAll("extras");

  return properties.filter((property) => {
    const { meta_box } = property;

    if (propertyTypes.length && !propertyTypes.includes(meta_box.type)) return false;

    if (areas.length && !areas.includes(meta_box.area)) return false;

    if (budget && !matchesBudget(meta_box.price_from, budget)) return false;

    if (bedrooms && !matchesBedrooms(meta_box.bedrooms, bedrooms)) return false;

    if (extras.length && !extras.every((e) => matchesExtra(e, property))) return false;

    return true;
  });
};
