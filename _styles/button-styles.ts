import classNames from "classnames";

export const buttonStyles = (
  cssClasses?: string,
  disabled?: boolean,
  pending?: boolean,
  redButton?: boolean
) =>
  classNames(
    "border-2 flex text-subheading text-center px-10 py-3 justify-center ease-in-out duration-300 rounded-md",
    cssClasses,
    {
      "opacity-50 cursor-not-allowed": pending || disabled,
      "hover:cursor-pointer": !(disabled || pending),
      "bg-peach text-white border-peach": redButton,
      "desktop:hover:bg-white desktop:hover:text-peach":
        redButton && !(disabled || pending),
      "bg-white text-black border-peach": !redButton,
      "desktop:hover:bg-peach desktop:hover:text-white":
        !redButton && !(disabled || pending),
    }
  );
