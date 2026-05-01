"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";

import navData from "@/_data/nav-data.json";
import { Menu, X } from "lucide-react";

interface MobileHeaderProps {
  cssClasses?: string;
}

export function HeaderMobile({ cssClasses }: MobileHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className={classNames(cssClasses)}>
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col">
          <Link href="/">
            <Image
              src="/logos/bay-holiday-homes-logo.png"
              alt="Bay Holiday Homes Logo"
              width={300}
              height={100}
              className="w-[175px] h-auto tablet:w-[250px]"
              priority
            />
          </Link>
          <div className="flex items-center gap-1.5">
            <p className="text-[12px] tablet:text-[14px]">A partner of</p>
            <Link
              href="https://www.choicenet.co.za/"
              aria-label="Choice website"
              target="_blank"
              className="p-2 -m-2"
            >
              <Image
                src="/logos/choice-logo.jpg"
                alt="Bay Holiday Homes Logo"
                width={60}
                height={20}
                priority
                className="w-[50px] h-auto tablet:w-[60px]"
              />
            </Link>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="ease-in-out duration-300 -m-3 p-3"
          aria-label="Open menu"
        >
          <Menu color="#213766" size={28} />
        </button>
      </div>

      <div
        className={classNames(
          "fixed inset-0 z-50 transform bg-teal py-6 px-5 tablet:py-8 transition-transform duration-300 ease-in-out",
          {
            "translate-x-full": !isOpen,
          },
        )}
      >
        <div className="flex w-full gap-1 items-center justify-end mb-8">
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="p-2 -m-2"
          >
            <X color="#FFFFFF" size={30} />
          </button>
        </div>
        <nav>
          <ul className="grid gap-4">
            {navData.map(({ title, url }, id) => {
              return (
                <li key={id}>
                  <Link
                    href={url}
                    onClick={() => setIsOpen(false)}
                    className="text-[18px] font-normal text-white"
                  >
                    {title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
