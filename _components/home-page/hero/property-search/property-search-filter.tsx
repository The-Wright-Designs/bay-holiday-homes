"use client";

import Image from "next/image";
import FormSelectInput from "@/_components/ui/forms/form-select-input";
import ButtonType from "@/_components/ui/buttons/button-type";
import generalData from "@/_data/general-data.json";
import classNames from "classnames";

interface PropertySearchFilterProps {
  cssClasses?: string;
}

const PropertySearchFilter = ({ cssClasses }: PropertySearchFilterProps) => {
  const { propertySearch } = generalData;
  const propertyTypeOptions = propertySearch.propertyType;
  const areaOptions = propertySearch.area;
  const budgetOptions = propertySearch.budget;
  const bedroomsOptions = propertySearch.bedrooms;
  const extrasOptions = propertySearch.extras;

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
      />
      <FormSelectInput
        name="area"
        options={areaOptions}
        placeholder="Select"
        ariaLabel="Select area"
        label="Area:"
      />
      <FormSelectInput
        name="budget"
        options={budgetOptions}
        placeholder="Select"
        ariaLabel="Select budget"
        label="Budget:"
      />
      <FormSelectInput
        name="bedrooms"
        options={bedroomsOptions}
        placeholder="Select"
        ariaLabel="Number of bedrooms"
        label="Bedrooms:"
      />
      <FormSelectInput
        name="extras"
        options={extrasOptions}
        placeholder="Select"
        ariaLabel="Select extras"
        label="Extras:"
      />
      <ButtonType
        type="button"
        colorPeach
        cssClasses="!p-[12px] z-10 !min-w-[46px] !h-[46px]"
        ariaLabel="Search properties"
      >
        <Image
          src="/icons/search.svg"
          alt="Search properties"
          width={18}
          height={18}
          className="object-contain"
        />
      </ButtonType>
    </div>
  );
};

export default PropertySearchFilter;
