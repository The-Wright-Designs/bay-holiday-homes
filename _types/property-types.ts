export interface PropertyProps {
  propertyId: string;
  general: {
    propertyName: string;
    area:
      | "town-area"
      | "central-beach"
      | "beachy-head"
      | "keurbooms"
      | "secure-estate"
      | "robberg-longships";
    type: "townhouse" | "house" | "flat-apartment";
    beds: string;
    baths: string;
    totalLivingAreas?: string;
    totalLounges: string;
    loungeTypes?: {
      openPlan: boolean;
      outside: boolean;
    };
    pricePerNight: {
      from: string;
      to: string;
    };
    sizeSquareMeters?: string;
    description: string;
    availableDates: { start: string; end: string }[] | null;
    images: string[];
  };
  braaiFireplace: {
    available: boolean;
    type: {
      braai: {
        gas: boolean;
        weber: boolean;
        builtIn: boolean;
        pizzaOven: boolean;
      };
      fireplace: {
        wood: boolean;
        gas: boolean;
      };
    };
  } | null;
  parking: {
    available: boolean;
    type: {
      garage: string;
      undercover: string;
      street: string;
    };
  } | null;
  wiFi: {
    available: boolean;
    type: "fibre" | "basic";
    tenantToPayExtra: boolean;
  } | null;
  security: {
    available: boolean;
    type: {
      alarm: boolean;
      internal: boolean;
      externalBeams: boolean;
      electricFence: boolean;
      other: string;
    };
    securityService: {
      none: boolean;
      adt: boolean;
      smhart: boolean;
      other: string;
    };
  } | null;
  specialFeatures: {
    childFriendly: boolean;
    petFriendly: boolean;
    wheelChairFriendly: boolean;
    directBeachAccess: boolean;
    view: {
      ocean: boolean;
      mountain: boolean;
      lagoon: boolean;
      fynbos: boolean;
    };
    pool: {
      numberOf: string;
      type: {
        indoor: boolean;
        outdoor: boolean;
      };
    };
    hotTub: boolean;
    sauna: boolean;
  } | null;
}
