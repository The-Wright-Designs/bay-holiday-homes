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
    lounge_type?: ("open_plan" | "outside" | "standard")[];
    price_from: string;
    price_to: string;
    description: string;
    gallery: { full_url: string }[];
    bookable_dates: [string, string][] | null;
    special_features:
      | (
          | "child_friendly"
          | "pet_friendly"
          | "wheel_chair_friendly"
          | "direct_beach_access"
        )[]
      | null;
    view: ("ocean" | "mountain" | "lagoon" | "garden")[] | null;
    pool_number_of?: string;
    pool?: ("private" | "communal")[] | null;
    pool_other?: ("hot_tub" | "jaccuzi" | "sauna")[] | null;
    braai?: ("weber" | "weber_gas" | "pizza_oven")[] | null;
    built_in_braai?: "none" | "gas" | "wood" | null;
    fireplace?: ("wood" | "gas" | "fire_pit")[] | null;
    parking_garage?: string;
    parking_undercover?: string;
    parking_street?: string;
    wifi_type?: "fibre" | "basic" | null;
    wifi_tenant_pays?: string | null;
    tv?: ("smart" | "standard")[] | null;
    streaming_service?: ("dstv" | "netflix")[] | null;
    security_property?:
      | ("alarm" | "internal" | "external_beams" | "electric_fence" | "other")[]
      | null;
    security_service?:
      | ("service_adt" | "service_smhart" | "service_other")[]
      | ""
      | null;
  };
}
