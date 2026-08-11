import { PropertyProps } from "@/_types/property-types";

interface Props {
  meta_box: PropertyProps["meta_box"];
}

const PropertyDetailedInfoComponent = ({ meta_box }: Props) => {
  const totalParking =
    meta_box.parking_garage ||
    meta_box.parking_undercover ||
    meta_box.parking_street
      ? Number(meta_box.parking_garage ?? "0") +
        Number(meta_box.parking_undercover ?? "0") +
        Number(meta_box.parking_street ?? "0")
      : null;

  const loungeLabel = meta_box.lounge_type?.length
    ? meta_box.lounge_type
        .map((t) =>
          t === "open_plan"
            ? "Open plan"
            : t === "outside"
              ? "Outside"
              : "Standard",
        )
        .join(" & ")
    : null;

  const braaiLabel = [
    meta_box.braai?.includes("braai") && "Wood braai",
    meta_box.braai?.includes("weber") && "Weber",
    meta_box.braai?.includes("weber_gas") && "Weber (gas)",
    meta_box.braai?.includes("pizza_oven") && "Pizza oven",
    meta_box.built_in_braai === "gas" && "Built-in (gas)",
    meta_box.built_in_braai === "wood" && "Built-in (wood)",
  ]
    .filter(Boolean)
    .join(" & ");

  const fireplaceLabel = [
    meta_box.fireplace?.includes("wood") && "Wood burning (indoor)",
    meta_box.fireplace?.includes("gas") && "Gas burning (indoor)",
    meta_box.fireplace?.includes("fire_pit") && "Fire pit (outdoor)",
  ]
    .filter(Boolean)
    .join(" & ");

  const poolCount = Number(meta_box.pool_number_of ?? "0");

  const poolTypes = [
    meta_box.pool?.includes("private") && "Private",
    meta_box.pool?.includes("communal") && "Communal",
  ]
    .filter(Boolean)
    .join(" & ");

  const poolLabel =
    poolCount > 0
      ? `${poolCount}${poolTypes ? ` (${poolTypes})` : ""}`
      : poolTypes;

  const tvLabel = [
    meta_box.tv?.includes("smart") && "Smart TV",
    meta_box.tv?.includes("standard") && "Standard TV",
  ]
    .filter(Boolean)
    .join(" & ");

  const streamingLabel = [
    meta_box.streaming_service?.includes("dstv") && "DSTV",
    meta_box.streaming_service?.includes("netflix") && "Netflix",
  ]
    .filter(Boolean)
    .join(" & ");

  const securityLabel = meta_box.security_property?.length
    ? [
        meta_box.security_property.includes("electric_fence") &&
          "Electric fencing",
        meta_box.security_property.includes("alarm") && "Alarm",
        meta_box.security_property.includes("external_beams") &&
          "External beams",
        meta_box.security_property.includes("internal") && "Internal",
        meta_box.security_property.includes("other") && "Other",
      ]
        .filter(Boolean)
        .join(" & ")
    : null;

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-subheading">Detailed Information:</h2>
      {meta_box.total_living_areas && (
        <div className="grid gap-10 grid-cols-2 min-[500px]:grid-cols-[225px_1fr] min-[500px]:gap-0">
          <p>Living Area/s:</p>
          <p>
            {meta_box.total_living_areas}
            {loungeLabel ? ` (${loungeLabel})` : ""}
          </p>
        </div>
      )}
      {totalParking !== null && totalParking > 0 && (
        <div className="grid gap-10 grid-cols-2 min-[500px]:grid-cols-[225px_1fr] min-[500px]:gap-0">
          <p>Parking Space/s:</p>
          <p>{totalParking}</p>
        </div>
      )}
      {securityLabel && (
        <div className="grid gap-10 grid-cols-2 min-[500px]:grid-cols-[225px_1fr] min-[500px]:gap-0">
          <p>Security:</p>
          <p>{securityLabel}</p>
        </div>
      )}
      {poolLabel && (
        <div className="grid gap-10 grid-cols-2 min-[500px]:grid-cols-[225px_1fr] min-[500px]:gap-0">
          <p>Pool/s:</p>
          <p>{poolLabel}</p>
        </div>
      )}
      {braaiLabel && (
        <div className="grid gap-10 grid-cols-2 min-[500px]:grid-cols-[225px_1fr] min-[500px]:gap-0">
          <p>Braai/s:</p>
          <p>{braaiLabel}</p>
        </div>
      )}
      {fireplaceLabel && (
        <div className="grid gap-10 grid-cols-2 min-[500px]:grid-cols-[225px_1fr] min-[500px]:gap-0">
          <p>Fireplace/s:</p>
          <p>{fireplaceLabel}</p>
        </div>
      )}
      {meta_box.wifi_type && (
        <div className="grid gap-10 grid-cols-2 min-[500px]:grid-cols-[225px_1fr] min-[500px]:gap-0">
          <p>WiFi:</p>
          <p>
            {meta_box.wifi_type === "fibre" ? "High speed fibre" : "Basic WiFi"}
          </p>
        </div>
      )}
      {tvLabel && (
        <div className="grid gap-10 grid-cols-2 min-[500px]:grid-cols-[225px_1fr] min-[500px]:gap-0">
          <p>TV/s:</p>
          <p>{tvLabel}</p>
        </div>
      )}
      {streamingLabel && (
        <div className="grid gap-10 grid-cols-2 min-[500px]:grid-cols-[225px_1fr] min-[500px]:gap-0">
          <p>TV/Streaming service/s:</p>
          <p>{streamingLabel}</p>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailedInfoComponent;
