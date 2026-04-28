"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PropertyCard from "./property-card";
import classNames from "classnames";
import PropertyListSorting from "./property-list-sorting";
import PropertyListSearch from "./property-list-search";
import PropertyListPagination from "./property-list-pagination";
import { PropertyProps } from "@/_types/property-types";
import { filterProperties } from "@/_lib/utils/property-filter-utils";

interface PropertyListComponentProps {
  cssClasses?: string;
  properties: PropertyProps[];
  totalPages: number;
  currentPage: number;
}

export default function PropertyListComponent({
  cssClasses,
  properties,
  totalPages,
  currentPage,
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
    const filtered = filterProperties(properties, urlParams);
    setFilteredByUrl(filtered as PropertyProps[]);
  }, [searchParams, properties]);

  const searchProperties = (properties: PropertyProps[]): PropertyProps[] => {
    if (!searchQuery) return properties;

    const nameMatches: PropertyProps[] = [];
    const areaMatches: PropertyProps[] = [];
    const descriptionMatches: PropertyProps[] = [];

    properties.forEach((property) => {
      const { meta_box, title } = property;
      const matchesName = title.rendered.toLowerCase().includes(searchQuery);
      const matchesArea = meta_box.area.toLowerCase().includes(searchQuery);
      const matchesDescription = meta_box.description
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
      : properties;

  const filteredProperties = searchQuery
    ? searchProperties(baseProperties)
    : baseProperties;

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortOption === "a-z") {
      return a.title.rendered.localeCompare(b.title.rendered);
    } else if (sortOption === "price-high-low") {
      return Number(b.meta_box.price_from) - Number(a.meta_box.price_from);
    } else if (sortOption === "price-low-high") {
      return Number(a.meta_box.price_from) - Number(b.meta_box.price_from);
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
              id={property.meta_box.property_id}
              property={property}
            />
          ))}
        </div>
      )}
      <PropertyListPagination
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
