"use client";

import { useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import { inputStyles } from "@/_styles/input-styles";

interface EnquiryFormSelectInputProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
  placeholderText?: string;
  required?: boolean;
  cssClasses?: string;
}

const EnquiryFormSelectInput = ({
  label,
  name,
  options,
  defaultValue,
  placeholderText = "Select an option",
  required,
  cssClasses,
}: EnquiryFormSelectInputProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={classNames("flex flex-col gap-3", cssClasses)}>
      <label htmlFor={name} className="text-white text-subheading">
        {label}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          defaultValue={defaultValue ?? ""}
          required={required}
          className={classNames(
            inputStyles(),
            "appearance-none desktop:hover:cursor-pointer",
          )}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
        >
          <option value="" disabled>
            {placeholderText}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Image
          src="/icons/chevron_right.svg"
          alt=""
          width={24}
          height={24}
          aria-hidden
          className={classNames(
            "absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none ease-in-out duration-300",
            { "rotate-[270deg]": isOpen },
          )}
        />
      </div>
    </div>
  );
};

export default EnquiryFormSelectInput;
