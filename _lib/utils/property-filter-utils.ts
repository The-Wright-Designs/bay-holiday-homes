import { PropertyProps } from "@/_types/property-types";

export interface PropertyFilterState {
  propertyType: string[];
  area: string[];
  budget: string;
  bedrooms: string;
  extras: string[];
}

export const buildFilterUrl = (filters: PropertyFilterState): string => {
  const params = new URLSearchParams();

  filters.propertyType.forEach((v) => params.append("propertyType", v));
  filters.area.forEach((v) => params.append("area", v));
  if (filters.budget) params.append("budget", filters.budget);
  if (filters.bedrooms) params.append("bedrooms", filters.bedrooms);
  filters.extras.forEach((v) => params.append("extras", v));

  const queryString = params.toString();
  return queryString ? `/properties?${queryString}` : "/properties";
};

const matchesBudget = (priceFrom: string, budgetRange: string): boolean => {
  const price = Number(priceFrom);
  if (budgetRange === "0-5000") return price >= 0 && price <= 5000;
  if (budgetRange === "5000-10000") return price >= 5000 && price <= 10000;
  if (budgetRange === "10000+") return price >= 10000;
  return true;
};

const matchesBedrooms = (beds: string, bedroomRange: string): boolean => {
  const count = Number(beds);
  if (bedroomRange === "1-2") return count >= 1 && count <= 2;
  if (bedroomRange === "3-4") return count >= 3 && count <= 4;
  if (bedroomRange === "5+") return count >= 5;
  return true;
};

const matchesExtra = (extra: string, property: PropertyProps): boolean => {
  const { specialFeatures } = property;
  if (!specialFeatures) return false;
  if (extra === "childFriendly") return specialFeatures.childFriendly;
  if (extra === "petFriendly") return specialFeatures.petFriendly;
  if (extra === "wheelChairFriendly") return specialFeatures.wheelChairFriendly;
  if (extra === "directBeachAccess") return specialFeatures.directBeachAccess;
  if (extra === "pool") return Number(specialFeatures.pool.numberOf) > 0;
  if (extra === "hotTub") return specialFeatures.hotTub;
  if (extra === "sauna") return specialFeatures.sauna;
  if (extra === "oceanView") return specialFeatures.view.ocean;
  if (extra === "mountainView") return specialFeatures.view.mountain;
  if (extra === "lagoonView") return specialFeatures.view.lagoon;
  if (extra === "fynbosView") return specialFeatures.view.fynbos;
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
    const { general } = property;

    if (propertyTypes.length && !propertyTypes.includes(general.type)) return false;

    if (areas.length && !areas.includes(general.area)) return false;

    if (budget && !matchesBudget(general.pricePerNight.from, budget)) return false;

    if (bedrooms && !matchesBedrooms(general.beds, bedrooms)) return false;

    if (extras.length && !extras.some((e) => matchesExtra(e, property))) return false;

    return true;
  });
};
