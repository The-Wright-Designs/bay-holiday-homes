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

const areaToSlug = (area: string): string => {
  return area.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");
};

const matchesBudget = (price: number, budgetRange: string): boolean => {
  if (budgetRange === "0-5000") {
    return price >= 0 && price <= 5000;
  } else if (budgetRange === "5000-10000") {
    return price >= 5000 && price <= 10000;
  } else if (budgetRange === "10000+") {
    return price >= 10000;
  }
  return true;
};

const matchesBedrooms = (bedrooms: number, bedroomRange: string): boolean => {
  if (bedroomRange === "1-2") {
    return bedrooms >= 1 && bedrooms <= 2;
  } else if (bedroomRange === "3-4") {
    return bedrooms >= 3 && bedrooms <= 4;
  } else if (bedroomRange === "5+") {
    return bedrooms >= 5;
  }
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
    if (propertyType && property.type.toLowerCase() !== propertyType) {
      return false;
    }

    if (area && areaToSlug(property.area) !== area) {
      return false;
    }

    if (budget && !matchesBudget(property.pricePerNight, budget)) {
      return false;
    }

    if (bedrooms && !matchesBedrooms(property.bedrooms, bedrooms)) {
      return false;
    }

    if (extras) {
      if (extras === "pool" && !property.pool) {
        return false;
      }
      if (extras === "sea-view" && !property.seaView) {
        return false;
      }
      if (extras === "pet-friendly" && !property.petFriendly) {
        return false;
      }
    }

    return true;
  });
};
