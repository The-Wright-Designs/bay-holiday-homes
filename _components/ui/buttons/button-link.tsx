import { buttonStyles } from "@/_styles/button-styles";
import { ButtonProps } from "@/_types/button-types";
import Link from "next/link";

const ButtonLink = ({
  children,
  onClick,
  cssClasses,
  href = "#",
  disabled,
  ariaLabel,
  colorWhite = false,
  navyStroke = false,
  colorNavy = false,
  colorPeach = false,
  tealStroke = false,
  target = "_self",
}: ButtonProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={buttonStyles(cssClasses, disabled, false, colorWhite, navyStroke, colorNavy, colorPeach, tealStroke)}
      aria-label={ariaLabel}
      target={target}
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
