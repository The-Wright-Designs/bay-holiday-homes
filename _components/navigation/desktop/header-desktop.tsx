import Link from "next/link";
import Image from "next/image";
import navData from "@/_data/nav-data.json";
import classNames from "classnames";

interface DesktopHeaderProps {
  cssClasses?: string;
}

const HeaderDesktop = ({ cssClasses }: DesktopHeaderProps) => {
  return (
    <div className={classNames(cssClasses)}>
      <div className="flex items-center justify-between">
        <Link href="/" className="hover:opacity-90">
          <Image src="/logo/logo.svg" alt="Bay Holiday Homes Logo" width={50} height={50} />
        </Link>
        <nav className="flex gap-3 items-end">
          {navData.map((item) => (
            <Link
              key={item.title}
              className="text-white text-base font-light desktop:hover:text-navy"
              href={item.url}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default HeaderDesktop;
