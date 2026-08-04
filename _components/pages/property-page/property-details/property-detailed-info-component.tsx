import { PropertyProps } from "@/_types/property-types";

interface Props {
  meta_box: PropertyProps["meta_box"];
}

const PropertyDetailedInfoComponent = ({ meta_box }: Props) => {
  const totalParking =
    meta_box.parking_garage || meta_box.parking_undercover || meta_box.parking_street
      ? Number(meta_box.parking_garage ?? "0") +
        Number(meta_box.parking_undercover ?? "0") +
        Number(meta_box.parking_street ?? "0")
      : null;

  const loungeLabel = meta_box.lounge_type?.length
    ? meta_box.lounge_type
        .map((t) =>
          t === "open_plan" ? "Open plan" : t === "outside" ? "Outside" : "Standard"
        )
        .join(" & ")
    : null;

  const securityLabel = meta_box.security_property?.length
    ? [
        meta_box.security_property.includes("electric_fence") && "Electric fencing",
        meta_box.security_property.includes("alarm") && "Alarm",
        meta_box.security_property.includes("external_beams") && "External beams",
        meta_box.security_property.includes("internal") && "Internal",
        meta_box.security_property.includes("other") && "Other",
      ]
        .filter(Boolean)
        .join(" & ")
    : null;

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-subheading">Detailed Information:</h2>
      {meta_box.size_square_meters && (
        <div className="grid gap-10 grid-cols-2 min-[500px]:grid-cols-[200px_1fr] min-[500px]:gap-0">
          <p>Size:</p>
          <p>{meta_box.size_square_meters}m²</p>
        </div>
      )}
      {meta_box.total_living_areas && (
        <div className="grid gap-10 grid-cols-2 min-[500px]:grid-cols-[200px_1fr] min-[500px]:gap-0">
          <p>Living Areas:</p>
          <p>{meta_box.total_living_areas}</p>
        </div>
      )}
      {meta_box.total_lounges && meta_box.total_lounges !== "0" && (
        <div className="grid gap-10 grid-cols-2 min-[500px]:grid-cols-[200px_1fr] min-[500px]:gap-0">
          <p>Lounges:</p>
          <p>{meta_box.total_lounges}{loungeLabel ? ` (${loungeLabel})` : ""}</p>
        </div>
      )}
      {totalParking !== null && totalParking > 0 && (
        <div className="grid gap-10 grid-cols-2 min-[500px]:grid-cols-[200px_1fr] min-[500px]:gap-0">
          <p>Parking Spaces:</p>
          <p>{totalParking}</p>
        </div>
      )}
      {securityLabel && (
        <div className="grid gap-10 grid-cols-2 min-[500px]:grid-cols-[200px_1fr] min-[500px]:gap-0">
          <p>Security:</p>
          <p>{securityLabel}</p>
        </div>
      )}
      {meta_box.wifi_type && (
        <div className="grid gap-10 grid-cols-2 min-[500px]:grid-cols-[200px_1fr] min-[500px]:gap-0">
          <p>WiFi:</p>
          <p>{meta_box.wifi_type === "fibre" ? "High speed fibre" : "Basic WiFi"}</p>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailedInfoComponent;
