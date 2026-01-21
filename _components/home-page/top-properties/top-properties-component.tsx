import Image from "next/image";
import placeholderData from "@/_data/placeholder-data.json";
import TopPropertiesSlider from "./top-properties-slider";

const TopPropertiesComponent = () => {
  return (
    <div className="flex flex-col gap-10 py-15 border-y border-black/25 desktop:py-0 desktop:border-none">
      <div className="flex flex-col gap-2 items-center justify-center desktop:flex-row">
        <h2 className="text-[40px] font-light text-black text-center uppercase">
          Top properties for the month of{" "}
          <span className="font-bold text-[40px]">February</span>
        </h2>
        <Image
          src="/icons/heart.svg"
          alt="Heart icon"
          width={80}
          height={80}
          className="order-first desktop:w-[42px] desktop:h-[42px] desktop:order-last"
        />
      </div>
      <TopPropertiesSlider topProperties={placeholderData.topProperties} />
    </div>
  );
};

export default TopPropertiesComponent;
