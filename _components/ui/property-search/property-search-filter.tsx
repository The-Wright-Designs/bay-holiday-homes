"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";
import FormSelectInput from "@/_components/ui/forms/form-select-input";
import ButtonType from "@/_components/ui/buttons/button-type";
import generalData from "@/_data/general-data.json";
import classNames from "classnames";
import {
  buildFilterUrl,
  getFiltersFromSearchParams,
  PropertyFilterState,
} from "@/_lib/utils/property-filter-utils";
import { X } from "lucide-react";

interface PropertySearchFilterProps {
  cssClasses?: string;
}

const PropertySearchFilter = ({ cssClasses }: PropertySearchFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { propertySearch } = generalData;
  const propertyTypeOptions = propertySearch.propertyType;
  const areaOptions = propertySearch.area;
  const budgetOptions = propertySearch.budget;
  const bedroomsOptions = propertySearch.bedrooms;
  const extrasOptions = propertySearch.extras;

  const [filters, setFilters] = useState<PropertyFilterState>(() =>
    getFiltersFromSearchParams(searchParams),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [prevSearchParams, setPrevSearchParams] = useState(searchParams);

  if (searchParams !== prevSearchParams) {
    setPrevSearchParams(searchParams);
    setFilters(getFiltersFromSearchParams(searchParams));
  }

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  const handleMultiFilterChange = (
    field: "propertyType" | "area" | "extras",
  ) => {
    return (value: string[]) => {
      setFilters((prev) => ({ ...prev, [field]: value }));
    };
  };

  const handleSingleFilterChange = (field: "budget" | "bedrooms") => {
    return (value: string[]) => {
      setFilters((prev) => ({ ...prev, [field]: value[0] ?? "" }));
    };
  };

  const hasActiveFilters =
    filters.propertyType.length > 0 ||
    filters.area.length > 0 ||
    filters.budget !== "" ||
    filters.bedrooms !== "" ||
    filters.extras.length > 0;

  const handleClear = () => {
    setFilters({
      propertyType: [],
      area: [],
      budget: "",
      bedrooms: "",
      extras: [],
    });
    if (pathname === "/properties") {
      router.push("/properties");
    }
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
        onChange={handleMultiFilterChange("propertyType")}
        multiple
      />
      <FormSelectInput
        name="area"
        options={areaOptions}
        placeholder="Select"
        ariaLabel="Select area"
        label="Area:"
        value={filters.area}
        onChange={handleMultiFilterChange("area")}
        multiple
      />
      <FormSelectInput
        name="budget"
        options={budgetOptions}
        placeholder="Select"
        ariaLabel="Select budget"
        label="Budget p/n:"
        value={filters.budget ? [filters.budget] : []}
        onChange={handleSingleFilterChange("budget")}
      />
      <FormSelectInput
        name="bedrooms"
        options={bedroomsOptions}
        placeholder="Select"
        ariaLabel="Number of bedrooms"
        label="Bedrooms:"
        value={filters.bedrooms ? [filters.bedrooms] : []}
        onChange={handleSingleFilterChange("bedrooms")}
      />
      <FormSelectInput
        name="extras"
        options={extrasOptions}
        placeholder="Select"
        ariaLabel="Select extras"
        label="Extras:"
        value={filters.extras}
        onChange={handleMultiFilterChange("extras")}
        multiple
      />
      <ButtonType
        type="button"
        colorPeach
        cssClasses="!p-[12px] !min-w-[46px] !h-[46px] z-10"
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
      {hasActiveFilters && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute flex gap-1 items-center -bottom-11 px-3 py-1 left-1/2 -translate-x-1/2 bg-white text-navy text-[13px] hover:cursor-pointer hover:opacity-80 ease-in-out duration-300"
        >
          <X width={14} color="#213766" />
          Clear
        </button>
      )}
    </div>
  );
};

export default PropertySearchFilter;
