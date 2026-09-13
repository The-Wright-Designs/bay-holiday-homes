import { WordpressImage } from "@/_types/property-types";

export interface TopProperty {
  meta_box: {
    top_property_id: string;
    title: string;
    image: WordpressImage;
  };
}

export interface TopPropertiesSliderProps {
  cssClasses?: string;
  topProperties: TopProperty[];
}
