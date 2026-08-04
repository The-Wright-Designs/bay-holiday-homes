import {
  BedDouble,
  Bath,
  Baby,
  PawPrint,
  Accessibility,
  WavesLadder,
  Shrub,
  Flame,
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
  meta_box: PropertyProps["meta_box"];
}

const PropertySummaryComponent = ({ meta_box }: Props) => {
  const poolCount = Number(meta_box.pool_number_of ?? "0");

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-subheading">Summary:</h2>
      <div className="grid min-[500px]:grid-cols-2 gap-3 tablet:grid-cols-3">
        <div className="flex items-center gap-2">
          <BedDouble size={ICON_SIZE} color={TEAL} />
          <p>
            {meta_box.beds} bedroom{meta_box.beds === "1" ? "" : "s"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Bath size={ICON_SIZE} color={TEAL} />
          <p>
            {meta_box.baths} bathroom{meta_box.baths === "1" ? "" : "s"}
          </p>
        </div>
        {meta_box.special_features?.includes("child_friendly") && (
          <div className="flex items-center gap-2">
            <Baby size={ICON_SIZE} color={TEAL} />
            <p>Child friendly</p>
          </div>
        )}
        {meta_box.special_features?.includes("pet_friendly") && (
          <div className="flex items-center gap-2">
            <PawPrint size={ICON_SIZE} color={TEAL} />
            <p>Pet friendly</p>
          </div>
        )}
        {meta_box.special_features?.includes("wheel_chair_friendly") && (
          <div className="flex items-center gap-2">
            <Accessibility size={ICON_SIZE} color={TEAL} />
            <p>Wheelchair friendly</p>
          </div>
        )}
        {poolCount > 0 && (
          <div className="flex items-center gap-2">
            <WavesLadder color={TEAL} size={ICON_SIZE} />
            <p>{poolCount > 1 ? `${poolCount} pools` : "Pool"}</p>
          </div>
        )}
        {meta_box.special_features?.includes("direct_beach_access") && (
          <div className="flex items-center gap-2">
            <SurfingIcon color={TEAL} size={ICON_SIZE} />
            <p>Beach access</p>
          </div>
        )}
        {meta_box.view?.includes("ocean") && (
          <div className="flex items-center gap-2">
            <OceanIcon color={TEAL} size={36} />
            <p>Ocean view</p>
          </div>
        )}
        {meta_box.view?.includes("mountain") && (
          <div className="flex items-center gap-2">
            <MountainIcon color={TEAL} size={36} />
            <p>Mountain view</p>
          </div>
        )}
        {meta_box.view?.includes("lagoon") && (
          <div className="flex items-center gap-2">
            <LagoonIcon color={TEAL} size={36} />
            <p>Lagoon view</p>
          </div>
        )}
        {meta_box.view?.includes("garden") && (
          <div className="flex items-center gap-2">
            <Shrub size={ICON_SIZE} color={TEAL} />
            <p>Garden view</p>
          </div>
        )}
        {meta_box.pool_other?.includes("hot_tub") && (
          <div className="flex items-center gap-2">
            <HotTubIcon color={TEAL} size={ICON_SIZE} />
            <p>Hot tub</p>
          </div>
        )}
        {meta_box.pool_other?.includes("jaccuzi") && (
          <div className="flex items-center gap-2">
            <HotTubIcon color={TEAL} size={ICON_SIZE} />
            <p>Jacuzzi</p>
          </div>
        )}
        {meta_box.pool_other?.includes("sauna") && (
          <div className="flex items-center gap-2">
            <SaunaIcon color={TEAL} size={ICON_SIZE} />
            <p>Sauna</p>
          </div>
        )}
        {meta_box.fireplace?.includes("fire_pit") && (
          <div className="flex items-center gap-2">
            <Flame size={ICON_SIZE} color={TEAL} />
            <p>Fire pit</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertySummaryComponent;
