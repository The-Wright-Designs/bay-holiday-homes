export interface TopProperty {
  title: string;
  image: string;
  href: string;
}

export interface TopPropertiesSliderProps {
  cssClasses?: string;
  topProperties: TopProperty[];
}
