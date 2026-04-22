export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  cssClasses?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  ariaLabel?: string;
  colorWhite?: boolean;
  navyStroke?: boolean;
  colorNavy?: boolean;
  colorPeach?: boolean;
  tealStroke?: boolean;
  target?: "_self" | "_blank";
  title?: string;
}
