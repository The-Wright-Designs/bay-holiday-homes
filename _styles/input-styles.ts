import classNames from "classnames";

export const inputStyles = (cssClasses?: string, disabled?: boolean) =>
  classNames(
    "rounded-[2px] px-[8px] py-[12px] w-full text-paragraph text-black ease-in-out duration-300 outline-none border-2 border-transparent focus:border-teal",
    cssClasses,
    {
      "cursor-not-allowed bg-white/85": disabled,
      "bg-white": !disabled,
    },
  );
