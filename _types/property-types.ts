export interface PropertyProps {
  id: number;
  title: {
    rendered: string;
  };
  slug: string;
  modified_gmt?: string;
  meta_box: {
    property_id: string;
    area:
      | "beachy-head"
      | "central-beach"
      | "keurbooms"
      | "secure-estate"
      | "town-area"
      | "robberg-longships";
    type: "house" | "flat-apartment" | "townhouse";
    beds: string;
    baths: string;
    total_living_areas?: string;
    total_lounges: string;
    lounge_type?: ("open_plan" | "outside" | "standard")[];
    price_from: string;
    price_to: string;
    size_square_meters?: string;
    description: string;
    gallery: { full_url: string }[];
    bookable_dates: [string, string][] | null;
    special_features:
      | (
          | "child_friendly"
          | "pet_friendly"
          | "wheel_chair_friendly"
          | "direct_beach_access"
          | "hot_tub"
          | "sauna"
        )[]
      | null;
    view: ("ocean" | "mountain" | "lagoon" | "fynbos")[] | null;
    pool_number_of?: string;
    pool?: ("indoor" | "outdoor")[] | null;
    braai?: ("gas" | "weber" | "built_in" | "pizza_oven")[] | null;
    fireplace?: ("wood" | "gas")[] | null;
    parking_garage?: string;
    parking_undercover?: string;
    parking_street?: string;
    wifi_type?: "fibre" | "basic" | null;
    wifi_tenant_pays?: string | null;
    security_property?:
      | ("alarm" | "internal" | "external_beams" | "electric_fence" | "other")[]
      | null;
    security_service?:
      | ("service_adt" | "service_smhart" | "service_other")[]
      | null;
  };
}
