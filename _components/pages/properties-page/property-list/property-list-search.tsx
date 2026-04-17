"use client";

import { useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import ButtonType from "@/_components/ui/buttons/button-type";

interface PropertyListSearchProps {
  cssClasses?: string;
  onSearch: (query: string) => void;
  onClearSearch: () => void;
  isSearching: boolean;
  hasActiveSearch: boolean;
}

export default function PropertyListSearch({
  cssClasses,
  onSearch,
  onClearSearch,
  isSearching,
  hasActiveSearch,
}: PropertyListSearchProps) {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    if (searchInput.trim()) {
      onSearch(searchInput);
    }
  };

  const handleClearSearch = () => {
    setSearchInput("");
    onClearSearch();
  };

  return (
    <div
      className={classNames(
        "flex flex-wrap gap-y-3 gap-x-5 items-center",
        cssClasses,
      )}
    >
      <div className="flex gap-3 min-[550px]:flex-row min-[550px]:items-start">
        <div className="relative w-full min-[550px]:w-auto">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search properties..."
            className="w-full bg-navy/10 rounded-[2px] px-2 py-2 text-[16px] font-light pr-10 min-[550px]:w-auto"
          />
          {isSearching && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <div className="spinner-small"></div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleSearch}
          className="max-w-[80px] px-6 py-[11px] rounded-[2px] min-[550px]:w-auto bg-teal tablet:hover:opacity-90 tablet:hover:cursor-pointer ease-in-out duration-300"
          aria-label="Search properties"
        >
          <div className="flex items-center gap-2">
            <Image
              src="/icons/search-white.svg"
              alt=""
              width={18}
              height={18}
            />
          </div>
        </button>
      </div>

      {hasActiveSearch && (
        <button
          type="button"
          onClick={handleClearSearch}
          className="text-[16px] font-light text-teal p-2 -m-2 desktop:p-0 desktop:m-0 desktop:hover:cursor-pointer desktop:hover:opacity-80 ease-in-out duration-300"
        >
          Clear Search
        </button>
      )}
    </div>
  );
}
