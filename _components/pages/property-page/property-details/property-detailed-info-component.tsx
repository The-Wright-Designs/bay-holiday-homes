import { PropertyProps } from "@/_types/property-types";

interface Props {
  general: PropertyProps["general"];
  parking: PropertyProps["parking"];
  security: PropertyProps["security"];
  wiFi: PropertyProps["wiFi"];
}

const PropertyDetailedInfoComponent = ({
  general,
  parking,
  security,
  wiFi,
}: Props) => {
  const totalParking = parking
    ? Number(parking.type.garage) +
      Number(parking.type.undercover) +
      Number(parking.type.street)
    : null;

  const securityLabel = security
    ? [
        security.type.electricFence && "Electric fencing",
        security.type.alarm && "Alarm",
        security.type.externalBeams && "External beams",
        security.type.internal && "Internal",
        security.type.other || null,
      ]
        .filter(Boolean)
        .join(" & ")
    : null;

  return (
    <div className="flex flex-col gap-3">
      <h3>Detailed Information:</h3>
      {general.sizeSquareMeters && (
        <div className="grid gap-10 grid-cols-2 min-[500px]:grid-cols-[200px_1fr] min-[500px]:gap-0">
          <p>Size:</p>
          <p>{general.sizeSquareMeters}m²</p>
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
      {wiFi?.available && (
        <div className="grid gap-10 grid-cols-2 min-[500px]:grid-cols-[200px_1fr] min-[500px]:gap-0">
          <p>WiFi:</p>
          <p>{wiFi.type === "fibre" ? "High speed fibre" : "Basic WiFi"}</p>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailedInfoComponent;
