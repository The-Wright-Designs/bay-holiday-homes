import classNames from "classnames";
import MosaicGalleryItem from "./mosaic-gallery-item";
import generalData from "@/_data/general-data.json";

const MosaicGalleryComponent = () => {
  return (
    <section className="flex flex-col gap-10 my-15">
      <div className="border-t mx-auto max-w-[768px] border-black/25 pt-10 flex flex-col gap-5 text-center">
        <h2 className="text-[32px]">
          Discover the most beautiful properties to rent in Plett
        </h2>
        <p className="text-[20px] max-w-[650px] mx-auto">
          Make your holiday experience in Plett become a dream come true, choose
          a holiday house in your favourite area!
        </p>
      </div>

      <div className="grid min-[600px]:grid-cols-2 min-[1000px]:grid-cols-3 desktop:grid-cols-4 gap-5">
        {generalData.mosaicGalleryItems.map((item) => (
          <MosaicGalleryItem
            key={item.id}
            image={item.image}
            heading={item.heading}
            large={item.large}
            areaId={item.id}
            cssClasses={classNames("aspect-square", {
              "desktop:aspect-[2/1]": item.large,
              "desktop:aspect-square": !item.large,
            })}
          />
        ))}
      </div>
    </section>
  );
};

export default MosaicGalleryComponent;
