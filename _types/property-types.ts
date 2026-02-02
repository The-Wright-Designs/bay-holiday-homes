export interface PropertyProps {
  id: string;
  type: string;
  name: string;
  area: string;
  description?: string;
  details?: {
    size: string;
    parkingSpaces: number;
    security: string;
    tvServices: string;
  };
  image: string;
  pricePerNight: number;
  bedrooms: number;
  bathrooms: number;
  beachAccess?: boolean;
  pool?: boolean;
  childFriendly?: boolean;
  seaView?: boolean;
  petFriendly?: boolean;
  cssClasses?: string;
}
