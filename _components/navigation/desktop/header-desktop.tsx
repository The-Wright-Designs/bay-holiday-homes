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
      <div className="flex items-end justify-between">
        <Link href="/" className="hover:opacity-90">
          <Image
            src="/logos/bay-holiday-homes-logo.png"
            alt="Bay Holiday Homes Logo"
            width={359}
            height={84}
          />
        </Link>
        <nav className="flex gap-5 mb-1 items-end">
          {navData.map((item) => (
            <Link
              key={item.title}
              className="text-navy text-base font-light desktop:hover:text-teal desktop:hover:cursor-pointer"
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
