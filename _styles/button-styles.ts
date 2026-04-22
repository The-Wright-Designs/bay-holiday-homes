import classNames from "classnames";

export const buttonStyles = (
  cssClasses?: string,
  disabled?: boolean,
  pending?: boolean,
  colorWhite?: boolean,
  navyStroke?: boolean,
  colorNavy?: boolean,
  colorPeach?: boolean,
  tealStroke?: boolean,
) =>
  classNames(
    "border-2 flex text-[16px] min-w-[150px] text-center px-10 py-3 justify-center ease-in-out duration-300 rounded-[2px]",
    cssClasses,
    {
      "opacity-50 cursor-not-allowed": pending || disabled,
      "hover:cursor-pointer": !(disabled || pending),
      "bg-white text-navy border-white": colorWhite,
      "desktop:hover:bg-teal desktop:hover:text-white":
        (colorWhite || tealStroke) && !(disabled || pending),
      "bg-white text-navy border-navy": navyStroke,
      "desktop:hover:bg-navy desktop:hover:text-white":
        navyStroke && !(disabled || pending),
      "bg-navy text-white border-navy": colorNavy,
      "desktop:hover:bg-white desktop:hover:text-navy":
        colorNavy && !(disabled || pending),
      "bg-peach text-black border-peach": colorPeach,
      "desktop:hover:bg-white": colorPeach && !(disabled || pending),
      "bg-white text-black border-teal": tealStroke,
      "bg-teal text-white border-teal":
        !colorWhite && !navyStroke && !colorNavy && !colorPeach && !tealStroke,
      "desktop:hover:bg-white desktop:hover:text-teal":
        !colorWhite &&
        !navyStroke &&
        !colorNavy &&
        !colorPeach &&
        !tealStroke &&
        !(disabled || pending),
    },
  );
