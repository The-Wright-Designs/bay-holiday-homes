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
        "flex flex-1 flex-col items-center justify-center gap-1 p-3 rounded-[2px] desktop:hover:cursor-pointer",
        selected ? "bg-teal" : "bg-white border-2 border-teal",
        cssClasses,
      )}
    >
      <div className="size-[40px] flex items-center justify-center">{icon}</div>
      <span
        className={classNames(
          "text-[16px] font-light",
          selected ? "text-white" : "text-black",
        )}
      >
        {heading}
      </span>
    </button>
  );
};

export default MobileFilterBlock;
