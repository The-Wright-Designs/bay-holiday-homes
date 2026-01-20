import Image from "next/image";
import classNames from "classnames";
import Link from "next/link";

interface MosaicGalleryItemProps {
  image: string;
  heading: string;
  large: boolean;
  cssClasses?: string;
}

const MosaicGalleryItem = ({
  image,
  heading,
  large,
  cssClasses,
}: MosaicGalleryItemProps) => {
  return (
    <Link
      href={`/${heading.replace(/,/g, "").replace(/&/g, "").replace(/\s+/g, "-").toLowerCase()}`}
      aria-label=""
      className={classNames(
        "group relative w-full h-full overflow-hidden desktop:hover:cursor-pointer",
        cssClasses,
        {
          "desktop:col-span-2": large,
        },
      )}
    >
      <Image
        src={image}
        alt={heading}
        fill
        className="object-cover transition-transform duration-500 delay-75 desktop:group-hover:scale-105"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white/80 py-3 px-8 rounded-lg max-w-3/4 desktop:group-hover:bg-teal ease-in-out duration-500 delay-150">
          <h3 className="text-center text-[20px] font-normal desktop:group-hover:text-white ease-in-out duration-500 delay-200">
            {heading}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default MosaicGalleryItem;
