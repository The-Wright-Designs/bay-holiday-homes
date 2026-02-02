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
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  ariaLabel?: string;
  label: string;
}

const FormSelectInput = ({
  name,
  options,
  placeholder = "Select an option",
  cssClasses,
  required = false,
  defaultValue,
  value,
  onChange,
  ariaLabel,
  label,
}: FormSelectInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || defaultValue || "");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const selectedLabel =
    options.find((opt) => opt.value === selectedValue)?.label || placeholder;

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
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
        selectedValue
          ? options.findIndex((opt) => opt.value === selectedValue)
          : 0,
      );
    }
  };

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    setFocusedIndex(-1);
    if (onChange) {
      onChange(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setIsOpen(true);
      setFocusedIndex(
        selectedValue
          ? options.findIndex((opt) => opt.value === selectedValue)
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
    "absolute left-0 right-0 top-full mt-3 bg-white rounded-[2px] max-h-[200px] overflow-y-auto z-50",
    {
      hidden: !isOpen,
    },
  );

  return (
    <div className="flex flex-col gap-[18px]">
      <label htmlFor={name} className="text-white text-[16px] font-normal">
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
          aria-label={ariaLabel || name}
        >
          <p
            className={classNames("text-[16px] font-light flex-1 truncate", {
              "text-navy": selectedValue,
              "text-black/50 italic": !selectedValue,
            })}
          >
            {selectedLabel}
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
          className={dropdownClasses}
          role="listbox"
          aria-label={ariaLabel || name}
        >
          {options.map((option, index) => {
            const isSelected = option.value === selectedValue;
            const isFocused = index === focusedIndex;

            const optionClasses = classNames(
              "p-[12px] text-navy text-[16px] font-light desktop:hover:cursor-pointer desktop:hover:bg-peach/50 ease-in-out duration-300",
              {
                "bg-teal text-white": isSelected,
                "bg-peach": isFocused && !isSelected,
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
          value={selectedValue}
          onChange={(e) => handleSelect(e.target.value)}
          required={required}
          className="visually-hidden"
          tabIndex={-1}
          aria-hidden="true"
        >
          <option value="" disabled>
            {placeholder}
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
