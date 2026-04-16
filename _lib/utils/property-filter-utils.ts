import { PropertyProps } from "@/_types/property-types";

export interface PropertyFilterState {
  propertyType?: string;
  area?: string;
  budget?: string;
  bedrooms?: string;
  extras?: string;
}

export const buildFilterUrl = (filters: PropertyFilterState): string => {
  const params = new URLSearchParams();

  if (filters.propertyType) params.append("propertyType", filters.propertyType);
  if (filters.area) params.append("area", filters.area);
  if (filters.budget) params.append("budget", filters.budget);
  if (filters.bedrooms) params.append("bedrooms", filters.bedrooms);
  if (filters.extras) params.append("extras", filters.extras);

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

export const filterProperties = (
  properties: PropertyProps[],
  searchParams: URLSearchParams,
): PropertyProps[] => {
  const propertyType = searchParams.get("propertyType");
  const area = searchParams.get("area");
  const budget = searchParams.get("budget");
  const bedrooms = searchParams.get("bedrooms");
  const extras = searchParams.get("extras");

  return properties.filter((property) => {
    const { general, specialFeatures } = property;

    if (propertyType && general.type !== propertyType) return false;

    if (area && general.area !== area) return false;

    if (budget && !matchesBudget(general.pricePerNight.from, budget)) return false;

    if (bedrooms && !matchesBedrooms(general.beds, bedrooms)) return false;

    if (extras) {
      if (extras === "pool" && (!specialFeatures || Number(specialFeatures.pool.numberOf) === 0)) return false;
      if (extras === "sea-view" && !specialFeatures?.view.ocean) return false;
      if (extras === "pet-friendly" && !specialFeatures?.petFriendly) return false;
    }

    return true;
  });
};
