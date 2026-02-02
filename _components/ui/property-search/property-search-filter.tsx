"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import FormSelectInput from "@/_components/ui/forms/form-select-input";
import ButtonType from "@/_components/ui/buttons/button-type";
import generalData from "@/_data/general-data.json";
import classNames from "classnames";
import {
  buildFilterUrl,
  PropertyFilterState,
} from "@/_lib/utils/property-filter-utils";

interface PropertySearchFilterProps {
  cssClasses?: string;
}

const PropertySearchFilter = ({ cssClasses }: PropertySearchFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { propertySearch } = generalData;
  const propertyTypeOptions = propertySearch.propertyType;
  const areaOptions = propertySearch.area;
  const budgetOptions = propertySearch.budget;
  const bedroomsOptions = propertySearch.bedrooms;
  const extrasOptions = propertySearch.extras;

  const [filters, setFilters] = useState<PropertyFilterState>({
    propertyType: searchParams.get("propertyType") || "",
    area: searchParams.get("area") || "",
    budget: searchParams.get("budget") || "",
    bedrooms: searchParams.get("bedrooms") || "",
    extras: searchParams.get("extras") || "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFilters({
      propertyType: searchParams.get("propertyType") || "",
      area: searchParams.get("area") || "",
      budget: searchParams.get("budget") || "",
      bedrooms: searchParams.get("bedrooms") || "",
      extras: searchParams.get("extras") || "",
    });
  }, [searchParams]);

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  const handleFilterChange = (field: keyof PropertyFilterState) => {
    return (value: string) => {
      setFilters((prev) => ({
        ...prev,
        [field]: value,
      }));
    };
  };

  const handleSearch = () => {
    setIsLoading(true);

    setTimeout(() => {
      const filterUrl = buildFilterUrl(filters);
      router.push(filterUrl);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div
      className={classNames("relative flex gap-[18px] items-end", cssClasses)}
    >
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-teal/50 w-[980px] h-[70px]" />
      <FormSelectInput
        name="propertyType"
        options={propertyTypeOptions}
        placeholder="Select"
        ariaLabel="Select property type"
        label="Property Type:"
        value={filters.propertyType}
        onChange={handleFilterChange("propertyType")}
      />
      <FormSelectInput
        name="area"
        options={areaOptions}
        placeholder="Select"
        ariaLabel="Select area"
        label="Area:"
        value={filters.area}
        onChange={handleFilterChange("area")}
      />
      <FormSelectInput
        name="budget"
        options={budgetOptions}
        placeholder="Select"
        ariaLabel="Select budget"
        label="Budget:"
        value={filters.budget}
        onChange={handleFilterChange("budget")}
      />
      <FormSelectInput
        name="bedrooms"
        options={bedroomsOptions}
        placeholder="Select"
        ariaLabel="Number of bedrooms"
        label="Bedrooms:"
        value={filters.bedrooms}
        onChange={handleFilterChange("bedrooms")}
      />
      <FormSelectInput
        name="extras"
        options={extrasOptions}
        placeholder="Select"
        ariaLabel="Select extras"
        label="Extras:"
        value={filters.extras}
        onChange={handleFilterChange("extras")}
      />
      <ButtonType
        type="button"
        colorPeach
        cssClasses="!p-[12px] z-10 !min-w-[46px] !h-[46px]"
        ariaLabel="Search properties"
        onClick={handleSearch}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="spinner-small" />
        ) : (
          <Image
            src="/icons/search.svg"
            alt="Search properties"
            width={18}
            height={18}
            className="object-contain"
          />
        )}
      </ButtonType>
    </div>
  );
};

export default PropertySearchFilter;
