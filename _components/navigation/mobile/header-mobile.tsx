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
        <Link href="/">
          <Image
            src="/logos/bay-holiday-homes-logo.png"
            alt="Bay Holiday Homes Logo"
            width={300}
            height={100}
            className="w-[157px] h-auto tablet:w-[250px]"
            priority
          />
        </Link>
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
          "fixed inset-0 z-50 transform bg-teal p-7 transition-transform duration-300 ease-in-out",
          {
            "translate-x-full": !isOpen,
          },
        )}
      >
        <div className="flex w-full gap-1 items-center justify-end mb-8 translate-x-[9px] -translate-y-1.5 tablet:translate-y-[5px]">
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
