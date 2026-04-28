"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import classNames from "classnames";

interface PropertyListPaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function PropertyListPagination({
  currentPage,
  totalPages,
}: PropertyListPaginationProps) {
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const buildPageUrl = (page: number): string => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    return `/properties?${params.toString()}`;
  };

  const getPageNumbers = (): (number | "...")[] => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  return (
    <div className="flex items-center justify-center gap-4 pt-10 desktop:gap-2">
      <Link
        href={buildPageUrl(currentPage - 1)}
        aria-disabled={currentPage === 1}
        className={classNames(
          "px-4 py-2 border border-navy text-navy desktop:hover:bg-navy desktop:hover:text-white desktop:hover:cursor-pointer transition-colors duration-300",
          { "pointer-events-none opacity-30": currentPage === 1 },
        )}
      >
        Prev
      </Link>

      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="px-2 text-navy">
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={buildPageUrl(page as number)}
            className={classNames(
              "px-4 py-2 border transition-colors duration-300 desktop:hover:cursor-pointer",
              {
                "bg-navy text-white border-navy": currentPage === page,
                "border-navy text-navy desktop:hover:bg-navy desktop:hover:text-white":
                  currentPage !== page,
              },
            )}
          >
            {page}
          </Link>
        ),
      )}

      <Link
        href={buildPageUrl(currentPage + 1)}
        aria-disabled={currentPage === totalPages}
        className={classNames(
          "px-4 py-2 border border-navy text-navy desktop:hover:bg-navy desktop:hover:text-white desktop:hover:cursor-pointer transition-colors duration-300",
          { "pointer-events-none opacity-30": currentPage === totalPages },
        )}
      >
        Next
      </Link>
    </div>
  );
}
