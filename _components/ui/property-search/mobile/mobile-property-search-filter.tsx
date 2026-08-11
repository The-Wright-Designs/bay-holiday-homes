"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";
import classNames from "classnames";
import ButtonType from "@/_components/ui/buttons/button-type";
import FormSelectInput from "@/_components/ui/forms/form-select-input";
import MobileFilterBlockContainer from "./mobile-filter-block-container";
import generalData from "@/_data/general-data.json";
import {
  buildFilterUrl,
  getFiltersFromSearchParams,
  PropertyFilterState,
} from "@/_lib/utils/property-filter-utils";
import { X } from "lucide-react";

interface MobilePropertySearchFilterProps {
  cssClasses?: string;
  tealButton?: boolean;
}

type SimpleFilterKey = "propertyType" | "area" | "extras";

const simpleFilterLabels: { key: SimpleFilterKey; label: string }[] = [
  { key: "propertyType", label: "Property Type" },
  { key: "area", label: "Area" },
  { key: "extras", label: "Extras" },
];

const filterHeadings: Record<SimpleFilterKey, string> = {
  propertyType: "Select Property Type",
  area: "Select Area",
  extras: "Select Extras",
};

const getDisplayLabel = (key: SimpleFilterKey, selected: string[]) => {
  if (selected.length === 0) return null;
  if (selected.length === 1) {
    const options = generalData.propertySearch[key];
    return options.find((o) => o.value === selected[0])?.label ?? null;
  }
  return `${selected.length} selected`;
};

const MobilePropertySearchFilter = ({
  cssClasses,
  tealButton,
}: MobilePropertySearchFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<SimpleFilterKey | null>(
    null,
  );
  const [filters, setFilters] = useState<PropertyFilterState>(() =>
    getFiltersFromSearchParams(searchParams),
  );
  const [prevSearchParams, setPrevSearchParams] = useState(searchParams);

  if (searchParams !== prevSearchParams) {
    setPrevSearchParams(searchParams);
    setFilters(getFiltersFromSearchParams(searchParams));
  }

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

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
      setIsOpen(false);
    }, 1000);
  };

  return (
    <div className={classNames(cssClasses)}>
      <ButtonType
        type="button"
        colorWhite={!tealButton}
        cssClasses="flex items-center gap-3"
        onClick={() => setIsOpen(true)}
      >
        <span
          className={classNames(
            "text-[16px] font-light",
            tealButton ? "text-white" : "text-navy",
          )}
        >
          Property Search
        </span>
        <Image
          src={`/icons/search${tealButton ? "-white" : ""}.svg`}
          alt="Search"
          width={18}
          height={18}
          className="animate-bounce"
        />
      </ButtonType>

      <div
        className={classNames(
          "fixed inset-0 z-50 overflow-y-auto max-h-full transform bg-teal px-5 py-6 transition-transform duration-300 ease-in-out flex flex-col gap-10 tablet:py-8.5",
          { "translate-x-full": !isOpen },
        )}
      >
        <div className="flex items-center justify-between">
          <p className="text-white text-[18px] font-medium">Property Filters</p>
          <button
            onClick={() => {
              setIsOpen(false);
              setActiveFilter(null);
            }}
            aria-label="Close filters"
            className={classNames("p-2 -m-2 desktop:hover:cursor-pointer", {
              invisible: activeFilter !== null,
            })}
          >
            <X color="#FFFFFF" size={28} />
          </button>
        </div>

        {activeFilter ? (
          <MobileFilterBlockContainer
            key={activeFilter}
            heading={filterHeadings[activeFilter]}
            options={generalData.propertySearch[activeFilter]}
            selected={filters[activeFilter]}
            onConfirm={(value) => {
              setFilters((prev) => ({ ...prev, [activeFilter]: value }));
              setActiveFilter(null);
            }}
            onCancel={() => setActiveFilter(null)}
          />
        ) : (
          <>
            <div className="flex flex-col gap-5">
              {simpleFilterLabels.map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveFilter(key)}
                  className="flex items-center justify-between w-full bg-white rounded-[2px] p-3 desktop:hover:cursor-pointer"
                >
                  <p className="text-navy text-[16px] font-light">{label}</p>
                  {getDisplayLabel(key, filters[key]) && (
                    <p className="text-navy text-[13px] font-light">
                      {getDisplayLabel(key, filters[key])}
                    </p>
                  )}
                  <Image
                    src="/icons/bird-icon.jpg"
                    alt="Bay Holiday Homes Bird Icon"
                    width={36}
                    height={14}
                    className="-translate-y-1 h-auto"
                  />
                </button>
              ))}
              <FormSelectInput
                name="budget"
                options={generalData.propertySearch.budget}
                placeholder="Select"
                ariaLabel="Select budget"
                label="Budget p/n"
                value={filters.budget ? [filters.budget] : []}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, budget: value[0] ?? "" }))
                }
                cssClasses="w-full"
                mobileFilter
              />
              <FormSelectInput
                name="bedrooms"
                options={generalData.propertySearch.bedrooms}
                placeholder="Select"
                ariaLabel="Number of bedrooms"
                label="Bedrooms"
                value={filters.bedrooms ? [filters.bedrooms] : []}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, bedrooms: value[0] ?? "" }))
                }
                cssClasses="w-full"
                mobileFilter
              />
            </div>

            <div className="flex flex-col gap-5">
              {hasActiveFilters && (
                <ButtonType
                  type="button"
                  navyStroke
                  cssClasses="w-full flex items-center justify-center gap-1"
                  ariaLabel="Clear filters"
                  onClick={handleClear}
                >
                  <X width={18} color="#213766" />
                  Clear
                </ButtonType>
              )}
              <ButtonType
                type="button"
                colorPeach
                cssClasses="w-full"
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
          </>
        )}
      </div>
    </div>
  );
};

export default MobilePropertySearchFilter;
