import TopPropertiesSlider from "./top-properties-slider";
import { fetchTopProperties } from "@/_lib/utils/wordpress-api";

const TopPropertiesComponent = async () => {
  const topProperties = await fetchTopProperties();
  return (
    <div className="flex flex-col gap-10 py-15 border-y border-black/25 desktop:py-0 desktop:border-none">
      <h2 className="text-[40px] font-light text-black text-center uppercase">
        Top properties for the month of{" "}
        <span className="font-bold text-[40px]">
          {new Date().toLocaleString("default", { month: "long" })}
        </span>
      </h2>
      <TopPropertiesSlider topProperties={topProperties} />
    </div>
  );
};

export default TopPropertiesComponent;
