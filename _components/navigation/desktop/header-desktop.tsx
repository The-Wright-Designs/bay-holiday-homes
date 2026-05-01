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
        <div>
          <Link href="/" className="hover:opacity-90">
            <Image
              src="/logos/bay-holiday-homes-logo.png"
              alt="Bay Holiday Homes Logo"
              width={344}
              height={84}
              className="h-auto"
              priority
            />
          </Link>
          <div className="flex items-center gap-1.5">
            <p className="text-[16px]">A partner of</p>
            <Link
              href="https://www.choicenet.co.za/"
              aria-label="Choice website"
              target="_blank"
              className="hover:opacity-90"
            >
              <Image
                src="/logos/choice-logo.jpg"
                alt="Bay Holiday Homes Logo"
                width={70}
                height={20}
                priority
              />
            </Link>
          </div>
        </div>
        <nav className="flex gap-5 mb-1 items-end">
          {navData.map((item) => (
            <Link
              key={item.title}
              className="text-navy text-base font-light desktop:hover:text-teal desktop:hover:cursor-pointer duration-200"
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
