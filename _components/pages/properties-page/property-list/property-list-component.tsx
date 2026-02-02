"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PropertyCard from "./property-card";
import placeholderData from "@/_data/placeholder-data.json";
import classNames from "classnames";
import PropertyListSorting from "./property-list-sorting";
import PropertyListSearch from "./property-list-search";
import { PropertyProps } from "@/_types/property-types";
import { filterProperties } from "@/_lib/utils/property-filter-utils";

interface PropertyListComponentProps {
  cssClasses?: string;
}

export default function PropertyListComponent({
  cssClasses,
}: PropertyListComponentProps) {
  const searchParams = useSearchParams();
  const [sortOption, setSortOption] = useState<string>("a-z");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [filteredByUrl, setFilteredByUrl] = useState<PropertyProps[]>([]);

  const handleSearch = (query: string) => {
    setIsSearching(true);
    setTimeout(() => {
      setSearchQuery(query.toLowerCase());
      setIsSearching(false);
    }, 1000);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams.toString());
    const filtered = filterProperties(placeholderData.propertyList, urlParams);
    setFilteredByUrl(filtered);
  }, [searchParams]);

  const searchProperties = (properties: PropertyProps[]): PropertyProps[] => {
    if (!searchQuery) return properties;

    const nameMatches: PropertyProps[] = [];
    const areaMatches: PropertyProps[] = [];
    const descriptionMatches: PropertyProps[] = [];
    const detailsMatches: PropertyProps[] = [];

    properties.forEach((property) => {
      const matchesName = property.name.toLowerCase().includes(searchQuery);
      const matchesArea = property.area.toLowerCase().includes(searchQuery);
      const matchesDescription = property.description
        ?.toLowerCase()
        .includes(searchQuery);

      const detailsString = property.details
        ? `${property.details.size} ${property.details.parkingSpaces} ${property.details.security} ${property.details.tvServices}`.toLowerCase()
        : "";
      const matchesDetails = detailsString.includes(searchQuery);

      if (matchesName) {
        nameMatches.push(property);
      } else if (matchesArea) {
        areaMatches.push(property);
      } else if (matchesDescription) {
        descriptionMatches.push(property);
      } else if (matchesDetails) {
        detailsMatches.push(property);
      }
    });

    return [
      ...nameMatches,
      ...areaMatches,
      ...descriptionMatches,
      ...detailsMatches,
    ];
  };

  const baseProperties = filteredByUrl.length > 0 || searchParams.toString()
    ? filteredByUrl
    : placeholderData.propertyList;

  const filteredProperties = searchQuery
    ? searchProperties(baseProperties)
    : baseProperties;

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortOption === "a-z") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "price-high-low") {
      return b.pricePerNight - a.pricePerNight;
    } else if (sortOption === "price-low-high") {
      return a.pricePerNight - b.pricePerNight;
    }
    return 0;
  });

  return (
    <div className="flex flex-col gap-10 pt-15">
      <div className="flex flex-wrap gap-10 items-end">
        <PropertyListSorting
          resultCount={filteredProperties.length}
          onSortChange={setSortOption}
        />
        <PropertyListSearch
          onSearch={handleSearch}
          onClearSearch={handleClearSearch}
          isSearching={isSearching}
          hasActiveSearch={!!searchQuery}
        />
      </div>
      {sortedProperties.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-center text-navy">
            Sorry, we have no properties that match your filter or search.
            Please adjust and try again.
          </p>
        </div>
      ) : (
        <div className={classNames("grid gap-10 tablet:grid-cols-2", cssClasses)}>
          {sortedProperties.map((property) => (
            <PropertyCard
              key={property.id}
              id={property.id}
              type={property.type}
              name={property.name}
              area={property.area}
              image={property.image}
              pricePerNight={property.pricePerNight}
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              beachAccess={property.beachAccess}
              pool={property.pool}
              childFriendly={property.childFriendly}
            />
          ))}
        </div>
      )}
    </div>
  );
}
