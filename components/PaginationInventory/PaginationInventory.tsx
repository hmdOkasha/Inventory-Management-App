"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import React from "react";

const PaginationInventory = ({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="mt-3 min-w-full h-20 bg-white rounded-lg shadow-xs flex items-center justify-center px-5 py-1 gap-2">
      <div className="flex items-center gap-1 border border-gray-200 rounded-md px-2 py-1 text-gray-800 text-sm">
        <IoIosArrowBack />
        <button
          className="hover:opacity-75 hover:cursor-pointer disabled:opacity-40"
          disabled={currentPage <= 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          Previous
        </button>
      </div>
      <div className="flex items-center justify-center rounded-md px-2 py-1 text-gray-800 text-sm gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => goToPage(p)}
            className={`px-3 py-1 rounded border text-sm border-gray-200 hover:cursor-pointer ${
              p === currentPage
                ? "bg-purple-600 text-white border-purple-600"
                : "hover:bg-gray-50"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-1 border border-gray-200 rounded-md pr-3 pl-1 py-1 text-gray-800 text-sm">
        <IoIosArrowForward />
        <button
          className="hover:opacity-75 hover:cursor-pointer disabled:opacity-40"
          disabled={currentPage >= totalPages}
          onClick={() => goToPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationInventory;
