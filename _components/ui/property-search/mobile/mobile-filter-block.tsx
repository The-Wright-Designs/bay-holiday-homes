import { ReactNode } from "react";
import classNames from "classnames";

interface MobileFilterBlockProps {
  heading: string;
  icon: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  cssClasses?: string;
}

const MobileFilterBlock = ({
  heading,
  icon,
  selected = false,
  onClick,
  cssClasses,
}: MobileFilterBlockProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        "flex flex-1 flex-col items-center justify-center border-2 gap-1 p-3 rounded-[2px] aspect-[3.5/4] phone:aspect-[3/4] min-[600px]:aspect-square",
        selected ? "bg-teal border-teal" : "bg-white border-teal",
        cssClasses,
      )}
    >
      <div className="size-10 flex items-center justify-center">{icon}</div>
      <span
        className={classNames(
          "text-[13px] font-light line-clamp-3 w-full",
          selected ? "text-white" : "text-black",
        )}
      >
        {heading}
      </span>
    </button>
  );
};

export default MobileFilterBlock;
