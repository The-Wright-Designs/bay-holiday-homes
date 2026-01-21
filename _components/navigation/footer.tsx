"use client";

import Link from "next/link";
import Image from "next/image";
import navData from "@/_data/nav-data.json";

const Footer = () => {
  return (
    <footer className="bg-white w-full mt-20 mb-5">
      <div className="border-t border-black border-opacity-25 px-5 pt-10 flex flex-col gap-6 desktop:max-w-[1280px] desktop:mx-auto desktop:px-[40px] desktop:pt-[40px] desktop:gap-5">
        <div className="flex flex-col gap-6 items-center desktop:flex-row desktop:justify-between desktop:items-start">
          <div className="flex flex-col gap-3 items-center desktop:items-start">
            <div className="flex flex-col gap-0.5 items-center desktop:items-start">
              {navData.map((item) => (
                <Link
                  key={item.url}
                  href={item.url}
                  className="text-navy text-[14px] transition-colors duration-300 desktop:hover:text-teal desktop:hover:cursor-pointer hidden desktop:block"
                >
                  {item.title}
                </Link>
              ))}
            </div>

            <div className="flex gap-5 items-center justify-center pt-3 desktop:pt-0 desktop:gap-3">
              <Link
                href="https://www.facebook.com/profile.php?id=100094256300725"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity duration-300 desktop:hover:opacity-80 desktop:hover:cursor-pointer"
                aria-label="Facebook"
              >
                <Image
                  src="/icons/facebook.svg"
                  alt="Facebook"
                  width={31}
                  height={31}
                  className="desktop:w-[24px] h-auto"
                />
              </Link>
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity duration-300 desktop:hover:opacity-80 desktop:hover:cursor-pointer"
                aria-label="Instagram"
              >
                <Image
                  src="/icons/instagram.svg"
                  alt="Instagram"
                  width={31}
                  height={31}
                  className="desktop:w-[24px] h-auto"
                />
              </Link>
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity duration-300 desktop:hover:opacity-80 desktop:hover:cursor-pointer"
                aria-label="WhatsApp"
              >
                <Image
                  src="/icons/whatsapp.svg"
                  alt="WhatsApp"
                  width={31}
                  height={31}
                  className="desktop:w-[24px] h-auto"
                />
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-5 items-center desktop:items-end">
            <div className="flex flex-col gap-5 items-center justify-center desktop:flex-row">
              <div className="flex gap-5 items-center justify-center">
                <Link
                  href="https://theppra.org.za/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity duration-300 desktop:hover:opacity-80 desktop:hover:cursor-pointer"
                  aria-label="Property Practitioners Regulatory Authority"
                >
                  <Image
                    src="/logos/pppra-logo.png"
                    alt="PPPRA Logo"
                    width={76}
                    height={56}
                  />
                </Link>
                <Link
                  href="https://www.plett-tourism.co.za/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity duration-300 desktop:hover:opacity-80 desktop:hover:cursor-pointer"
                  aria-label="Plett Tourism"
                >
                  <Image
                    src="/logos/plett-tourism-logo.png"
                    alt="Plett Tourism Logo"
                    width={84}
                    height={56}
                  />
                </Link>
              </div>

              <Image
                src="/logos/bay-holiday-homes-logo.png"
                alt="Bay Holiday Homes Logo"
                width={274}
                height={64}
                className="order-first w-[174px] h-auto desktop:w-[274px] desktop:order-none"
              />
            </div>

            <p className="text-center desktop:text-right text-[14px]">
              Designed &amp; developed by
              <br />
              <Link
                href="https://thewrightdesigns.co.za"
                className="transition-opacity duration-300 desktop:hover:opacity-80 desktop:hover:cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                The Wright Designs
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center w-full text-[14px]">
          © 2025 Bay Holiday Homes |{" "}
          <Link
            href="/"
            className="transition-opacity duration-300 desktop:hover:opacity-80 desktop:hover:cursor-pointer"
          >
            www.bayholidays.co.za
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
