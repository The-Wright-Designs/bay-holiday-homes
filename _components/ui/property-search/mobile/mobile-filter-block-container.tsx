"use client";

import { useState } from "react";
import {
  Home,
  Building2,
  Castle,
  DoorOpen,
  Umbrella,
  Car,
  Waves,
  TreePine,
} from "lucide-react";
import classNames from "classnames";
import ButtonType from "@/_components/ui/buttons/button-type";
import MobileFilterBlock from "./mobile-filter-block";

interface MobileFilterBlockContainerProps {
  heading: string;
  options: { value: string; label: string }[];
  selected: string[];
  onConfirm: (value: string[]) => void;
  onCancel: () => void;
  cssClasses?: string;
}

const placeholderIcons = [Home, Building2, Castle, DoorOpen, Umbrella, Car, Waves, TreePine];

const MobileFilterBlockContainer = ({
  heading,
  options,
  selected,
  onConfirm,
  onCancel,
  cssClasses,
}: MobileFilterBlockContainerProps) => {
  const [draft, setDraft] = useState<string[]>(selected);

  const toggle = (value: string) => {
    setDraft((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const rows: { value: string; label: string }[][] = [];
  for (let i = 0; i < options.length; i += 2) {
    rows.push(options.slice(i, i + 2));
  }

  return (
    <div
      className={classNames(
        "bg-white flex flex-col gap-5 p-3 rounded-[2px]",
        cssClasses,
      )}
    >
      <p className="text-[16px] font-light text-navy">{heading}</p>

      <div className="overflow-y-auto flex flex-col gap-5 max-h-[315px] pr-3">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-5">
            {row.map((option, index) => {
              const isSelected = draft.includes(option.value);
              const Icon =
                placeholderIcons[
                  (rowIndex * 2 + index) % placeholderIcons.length
                ];
              return (
                <MobileFilterBlock
                  key={option.value}
                  heading={option.label}
                  icon={
                    <Icon size={32} color={isSelected ? "#FFFFFF" : "#3D3D3D"} />
                  }
                  selected={isSelected}
                  onClick={() => toggle(option.value)}
                />
              );
            })}
            {row.length === 1 && <div className="flex-1" />}
          </div>
        ))}
      </div>

      <div className="flex gap-5">
        <ButtonType
          type="button"
          cssClasses="flex-1 !min-w-0"
          onClick={() => onConfirm(draft)}
        >
          Confirm
        </ButtonType>
        <ButtonType
          type="button"
          colorNavy
          cssClasses="flex-1 !min-w-0"
          onClick={onCancel}
        >
          Cancel
        </ButtonType>
      </div>
    </div>
  );
};

export default MobileFilterBlockContainer;
