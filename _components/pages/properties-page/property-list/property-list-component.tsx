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

interface PropertyListItem extends PropertyProps {
  id: string;
  slug: string;
}

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
  const [filteredByUrl, setFilteredByUrl] = useState<PropertyListItem[]>([]);

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
    const filtered = filterProperties(
      placeholderData.propertyList as PropertyListItem[],
      urlParams,
    );
    setFilteredByUrl(filtered as PropertyListItem[]);
  }, [searchParams]);

  const searchProperties = (
    properties: PropertyListItem[],
  ): PropertyListItem[] => {
    if (!searchQuery) return properties;

    const nameMatches: PropertyListItem[] = [];
    const areaMatches: PropertyListItem[] = [];
    const descriptionMatches: PropertyListItem[] = [];

    properties.forEach((property) => {
      const { general } = property;
      const matchesName = general.propertyName
        .toLowerCase()
        .includes(searchQuery);
      const matchesArea = general.area.toLowerCase().includes(searchQuery);
      const matchesDescription = general.description
        .toLowerCase()
        .includes(searchQuery);

      if (matchesName) {
        nameMatches.push(property);
      } else if (matchesArea) {
        areaMatches.push(property);
      } else if (matchesDescription) {
        descriptionMatches.push(property);
      }
    });

    return [...nameMatches, ...areaMatches, ...descriptionMatches];
  };

  const baseProperties =
    filteredByUrl.length > 0 || searchParams.toString()
      ? filteredByUrl
      : (placeholderData.propertyList as PropertyListItem[]);

  const filteredProperties = searchQuery
    ? searchProperties(baseProperties)
    : baseProperties;

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortOption === "a-z") {
      return a.general.propertyName.localeCompare(b.general.propertyName);
    } else if (sortOption === "price-high-low") {
      return (
        Number(b.general.pricePerNight.from) -
        Number(a.general.pricePerNight.from)
      );
    } else if (sortOption === "price-low-high") {
      return (
        Number(a.general.pricePerNight.from) -
        Number(b.general.pricePerNight.from)
      );
    }
    return 0;
  });

  return (
    <div className="flex flex-col gap-10 pt-15">
      <div className="flex flex-wrap gap-5 items-end">
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
            Sorry, we have no properties that match what you're looking for.
            Please adjust or <strong>clear your filter or search</strong> and
            try again.
          </p>
        </div>
      ) : (
        <div
          className={classNames("grid gap-10 tablet:grid-cols-2", cssClasses)}
        >
          {sortedProperties.map((property) => (
            <PropertyCard
              key={property.id}
              slug={property.slug}
              property={property}
            />
          ))}
        </div>
      )}
    </div>
  );
}
