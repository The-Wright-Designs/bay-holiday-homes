"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import classNames from "classnames";

interface FormSelectInputProps {
  name: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  cssClasses?: string;
  required?: boolean;
  defaultValue?: string[];
  value?: string[];
  onChange?: (value: string[]) => void;
  ariaLabel?: string;
  label: string;
  multiple?: boolean;
  mobileFilter?: boolean;
}

const FormSelectInput = ({
  name,
  options,
  placeholder,
  cssClasses,
  required = false,
  defaultValue,
  value,
  onChange,
  ariaLabel,
  label,
  multiple = false,
  mobileFilter = false,
}: FormSelectInputProps) => {
  const resolvedPlaceholder = mobileFilter
    ? label
    : (placeholder ?? "Select an option");

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>(
    value || defaultValue || [],
  );
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const getDisplayLabel = () => {
    if (selectedValues.length === 0) return resolvedPlaceholder;
    if (selectedValues.length === 1) {
      return (
        options.find((opt) => opt.value === selectedValues[0])?.label ||
        resolvedPlaceholder
      );
    }
    return `${selectedValues.length} selected`;
  };

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValues(value);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setFocusedIndex(
        selectedValues.length > 0
          ? options.findIndex((opt) => opt.value === selectedValues[0])
          : 0,
      );
    }
  };

  const handleSelect = (optionValue: string) => {
    let next: string[];
    if (multiple) {
      next = selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue];
    } else {
      next = selectedValues.includes(optionValue) ? [] : [optionValue];
      setIsOpen(false);
      setFocusedIndex(-1);
    }
    setSelectedValues(next);
    if (onChange) {
      onChange(next);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setIsOpen(true);
      setFocusedIndex(
        selectedValues.length > 0
          ? options.findIndex((opt) => opt.value === selectedValues[0])
          : 0,
      );
      return;
    }

    if (!isOpen) return;

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) =>
          prev < options.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < options.length) {
          handleSelect(options[focusedIndex].value);
        }
        break;
      case "Home":
        e.preventDefault();
        setFocusedIndex(0);
        break;
      case "End":
        e.preventDefault();
        setFocusedIndex(options.length - 1);
        break;
    }
  };

  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && dropdownRef.current) {
      const focusedElement = dropdownRef.current.children[
        focusedIndex
      ] as HTMLElement;
      if (focusedElement) {
        focusedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [focusedIndex, isOpen]);

  const containerClasses = classNames(
    "relative bg-white p-[8px] flex items-center justify-between gap-2 rounded-[2px] w-[160px] overflow-hidden desktop:hover:cursor-pointer",
    cssClasses,
  );

  const dropdownClasses = classNames(
    "absolute left-0 right-0 top-full mt-3 bg-white rounded-[2px] max-h-[200px] overflow-y-auto scrollbar-visible z-50 border border-black/50",
    {
      hidden: !isOpen,
    },
  );

  return (
    <div className="flex flex-col gap-[18px]">
      <label
        htmlFor={name}
        className={classNames("text-white text-[16px] font-medium", {
          "visually-hidden": mobileFilter,
        })}
      >
        {label}
      </label>
      <div ref={containerRef} className="relative">
        <div
          className={classNames(
            "hover:cursor-pointer hover:opacity-95 ease-in-out duration-300",
            containerClasses,
          )}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          tabIndex={0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={`${name}-listbox`}
          aria-label={ariaLabel || name}
        >
          <p
            className={classNames(
              "text-[16px] font-light flex-1 truncate pl-0.5",
              {
                "text-navy": selectedValues.length > 0,
                "text-black/60 font-normal italic": selectedValues.length === 0,
              },
            )}
          >
            {getDisplayLabel()}
          </p>
          <Image
            src="/icons/bird-icon.jpg"
            alt="Bay Holiday Homes Bird Icon"
            width={36}
            height={14}
            className={classNames(
              "-translate-y-1 h-auto ease-in-out duration-300",
              {
                "scale-120": isOpen,
                "-translate-y-1.5": isHovered,
              },
            )}
          />
        </div>

        <ul
          ref={dropdownRef}
          id={`${name}-listbox`}
          className={dropdownClasses}
          role="listbox"
          aria-label={ariaLabel || name}
          aria-multiselectable={multiple}
        >
          {options.map((option) => {
            const isSelected = selectedValues.includes(option.value);

            const optionClasses = classNames(
              "p-[12px] text-navy text-[16px] font-light desktop:hover:cursor-pointer ease-in-out duration-300",
              {
                "bg-teal text-white desktop:hover:bg-teal/90": isSelected,
                "desktop:hover:bg-teal/50": !isSelected,
              },
            );

            return (
              <li
                key={option.value}
                className={optionClasses}
                onClick={() => handleSelect(option.value)}
                role="option"
                aria-selected={isSelected}
              >
                {option.label}
              </li>
            );
          })}
        </ul>

        <select
          id={name}
          name={name}
          value={multiple ? selectedValues : (selectedValues[0] ?? "")}
          onChange={(e) => {
            const selected = Array.from(
              e.target.selectedOptions,
              (o) => o.value,
            );
            setSelectedValues(selected);
            if (onChange) onChange(selected);
          }}
          required={required}
          multiple={multiple}
          className="visually-hidden"
          tabIndex={-1}
          aria-hidden="true"
        >
          <option value="" disabled>
            {resolvedPlaceholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FormSelectInput;
