export interface TopProperty {
  meta_box: {
    top_property_id: string;
    title: string;
    image: {
      full_url: string;
    };
  };
}

export interface TopPropertiesSliderProps {
  cssClasses?: string;
  topProperties: TopProperty[];
}
