"use client";

import { useState, ReactNode } from "react";
import {
  Home,
  MapPin,
  ShieldCheck,
  Baby,
  PawPrint,
  Accessibility,
  WavesLadder,
  Shrub,
} from "lucide-react";
import {
  SurfingIcon,
  OceanIcon,
  HotTubIcon,
  SaunaIcon,
  MountainIcon,
  LagoonIcon,
  TownhouseIcon,
  ApartmentIcon,
  BeachyHeadIcon,
  CentralBeachIcon,
  RobbergIcon,
  KeurboomsIcon,
} from "@/_components/ui/icons/listing-icons";
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

const iconMap: Record<string, (color: string) => ReactNode> = {
  house: (c) => <Home size={32} color={c} />,
  "flat-apartment": (c) => <ApartmentIcon color={c} size={36} />,
  townhouse: (c) => <TownhouseIcon color={c} size={36} />,
  "town-area": (c) => <MapPin size={32} color={c} />,
  "central-beach": (c) => <CentralBeachIcon color={c} size={36} />,
  "beachy-head": (c) => <BeachyHeadIcon color={c} size={36} />,
  keurbooms: (c) => <KeurboomsIcon color={c} size={36} />,
  "secure-estate": (c) => <ShieldCheck size={32} color={c} />,
  "robberg-longships": (c) => <RobbergIcon color={c} size={36} />,
  childFriendly: (c) => <Baby size={32} color={c} />,
  petFriendly: (c) => <PawPrint size={32} color={c} />,
  wheelChairFriendly: (c) => <Accessibility size={32} color={c} />,
  directBeachAccess: (c) => <SurfingIcon color={c} size={36} />,
  pool: (c) => <WavesLadder size={32} color={c} />,
  hotTub: (c) => <HotTubIcon color={c} size={36} />,
  sauna: (c) => <SaunaIcon color={c} size={36} />,
  oceanView: (c) => <OceanIcon color={c} size={36} />,
  mountainView: (c) => <MountainIcon color={c} size={36} />,
  lagoonView: (c) => <LagoonIcon color={c} size={36} />,
  fynbosView: (c) => <Shrub size={32} color={c} />,
};

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

  const sorted = [...options].sort((a, b) => a.label.localeCompare(b.label));

  return (
    <div
      className={classNames(
        "overflow-y-auto max-h-full bg-white flex flex-col justify-between gap-5 relative h-full rounded-[2px]",
        cssClasses,
      )}
    >
      <div className="flex flex-col gap-5 p-4">
        <p className="text-[16px] font-light text-navy">{heading}</p>

        <div className="grid grid-cols-2 gap-4 phone:grid-cols-3 tablet:grid-cols-4 min-[1000px]:grid-cols-5">
          {sorted.map((option) => {
            const isSelected = draft.includes(option.value);
            const renderIcon =
              iconMap[option.value] ??
              ((c: string) => <Home size={32} color={c} />);
            return (
              <MobileFilterBlock
                key={option.value}
                heading={option.label}
                icon={renderIcon(isSelected ? "#FFFFFF" : "#213766")}
                selected={isSelected}
                onClick={() => toggle(option.value)}
              />
            );
          })}
        </div>
      </div>

      <div className="flex gap-5 bg-white/90 px-4 py-7 sticky bottom-0">
        <ButtonType
          type="button"
          navyStroke
          cssClasses="flex-1 !min-w-0"
          onClick={onCancel}
        >
          Cancel
        </ButtonType>
        <ButtonType
          type="button"
          cssClasses="flex-1 !min-w-0"
          colorNavy
          onClick={() => onConfirm(draft)}
        >
          Confirm
        </ButtonType>
      </div>
    </div>
  );
};

export default MobileFilterBlockContainer;
