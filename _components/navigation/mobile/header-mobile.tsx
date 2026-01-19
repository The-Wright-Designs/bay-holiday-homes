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
        <Link href="/" className="hover:opacity-90">
          <Image src="/logo/logo.svg" alt="Bay Holiday Homes Logo" width={50} height={50} />
        </Link>
        <button
          onClick={() => setIsOpen(true)}
          className="ease-in-out duration-300 -m-3 p-3"
          aria-label="Open menu"
        >
          <Menu size={22} color="#FFFFFF" />
        </button>
      </div>

      <div
        className={classNames(
          "fixed inset-0 z-50 transform bg-black transition-transform duration-300 ease-in-out",
          {
            "translate-x-full": !isOpen,
          }
        )}
      >
        <div className="flex w-full py-10 items-center px-5 justify-end">
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="p-2 -m-2"
          >
            <X size={22} color="#FFFFFF" />
          </button>
        </div>
        <nav className="px-5">
          <ul className="grid gap-5">
            {navData.map(({ title, url }, id) => {
              return (
                <li key={id}>
                  <Link
                    href={url}
                    onClick={() => setIsOpen(false)}
                    className="text-[18px] text-white font-light p-3 -m-3"
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
