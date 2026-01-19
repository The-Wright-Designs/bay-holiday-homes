import Image from "next/image";

import HeroSlider from "./hero-slider";

import sliderData from "@/_data/general-data.json";

const { heroSlider } = sliderData;

export default function HeroComponent() {
  return (
    <div className="max-w-[1280px] mx-auto">
      <HeroSlider
        data={heroSlider}
        cssClasses="h-[650px] desktop:h-[600px]"
      />
    </div>
  );
}
