"use client";

import { useRef } from "react";
import classNames from "classnames";
import { CalendarDays } from "lucide-react";
import { inputStyles } from "@/_styles/input-styles";

interface EnquiryFormDateInputProps {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  cssClasses?: string;
}

const EnquiryFormDateInput = ({
  label,
  name,
  defaultValue,
  required,
  cssClasses,
}: EnquiryFormDateInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={classNames("flex flex-col gap-3", cssClasses)}>
      <label htmlFor={name} className="text-white text-subheading">
        {label}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          id={name}
          name={name}
          type="date"
          defaultValue={defaultValue}
          required={required}
          className={classNames(
            inputStyles(),
            "appearance-none pr-10 [&::-webkit-calendar-picker-indicator]:hidden",
          )}
        />
        <div
          onClick={() => inputRef.current?.showPicker()}
          className="absolute inset-0 desktop:hover:cursor-pointer"
        />
        <CalendarDays
          color="#3D3D3D"
          size={24}
          aria-hidden
          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
        />
      </div>
    </div>
  );
};

export default EnquiryFormDateInput;
