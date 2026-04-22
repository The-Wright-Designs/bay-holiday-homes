import {
  BedDouble,
  Bath,
  Baby,
  PawPrint,
  Accessibility,
  WavesLadder,
  Shrub,
} from "lucide-react";
import {
  SurfingIcon,
  HotTubIcon,
  SaunaIcon,
  OceanIcon,
  MountainIcon,
  LagoonIcon,
} from "@/_components/ui/icons/listing-icons";
import { PropertyProps } from "@/_types/property-types";

const TEAL = "#4AB5BB";
const ICON_SIZE = 32;

interface Props {
  general: PropertyProps["general"];
  specialFeatures: PropertyProps["specialFeatures"];
}

const PropertySummaryComponent = ({ general, specialFeatures }: Props) => {
  const hasPool =
    specialFeatures?.pool?.numberOf && specialFeatures.pool.numberOf !== "0";

  return (
    <div className="flex flex-col gap-3">
      <h3>Summary:</h3>
      <div className="grid min-[500px]:grid-cols-2 gap-3 tablet:grid-cols-3">
        <div className="flex items-center gap-2">
          <BedDouble size={ICON_SIZE} color={TEAL} />
          <p>
            {general.beds} bedroom{general.beds === "1" ? "" : "s"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Bath size={ICON_SIZE} color={TEAL} />
          <p>
            {general.baths} bathroom{general.baths === "1" ? "" : "s"}
          </p>
        </div>
        {specialFeatures?.childFriendly && (
          <div className="flex items-center gap-2">
            <Baby size={ICON_SIZE} color={TEAL} />
            <p>Child friendly</p>
          </div>
        )}
        {specialFeatures?.petFriendly && (
          <div className="flex items-center gap-2">
            <PawPrint size={ICON_SIZE} color={TEAL} />
            <p>Pet friendly</p>
          </div>
        )}
        {specialFeatures?.wheelChairFriendly && (
          <div className="flex items-center gap-2">
            <Accessibility size={ICON_SIZE} color={TEAL} />
            <p>Wheelchair friendly</p>
          </div>
        )}
        {hasPool && (
          <div className="flex items-center gap-2">
            <WavesLadder color={TEAL} size={ICON_SIZE} />
            <p>Pool</p>
          </div>
        )}
        {specialFeatures?.directBeachAccess && (
          <div className="flex items-center gap-2">
            <SurfingIcon color={TEAL} size={ICON_SIZE} />
            <p>Beach access</p>
          </div>
        )}
        {specialFeatures?.view?.ocean && (
          <div className="flex items-center gap-2">
            <OceanIcon color={TEAL} size={36} />
            <p>Ocean view</p>
          </div>
        )}
        {specialFeatures?.view?.mountain && (
          <div className="flex items-center gap-2">
            <MountainIcon color={TEAL} size={36} />
            <p>Mountain view</p>
          </div>
        )}
        {specialFeatures?.view?.lagoon && (
          <div className="flex items-center gap-2">
            <LagoonIcon color={TEAL} size={36} />
            <p>Lagoon view</p>
          </div>
        )}
        {specialFeatures?.view?.fynbos && (
          <div className="flex items-center gap-2">
            <Shrub size={ICON_SIZE} color={TEAL} />
            <p>Fynbos view</p>
          </div>
        )}
        {specialFeatures?.hotTub && (
          <div className="flex items-center gap-2">
            <HotTubIcon color={TEAL} size={ICON_SIZE} />
            <p>Hot tub</p>
          </div>
        )}
        {specialFeatures?.sauna && (
          <div className="flex items-center gap-2">
            <SaunaIcon color={TEAL} size={ICON_SIZE} />
            <p>Sauna</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertySummaryComponent;
