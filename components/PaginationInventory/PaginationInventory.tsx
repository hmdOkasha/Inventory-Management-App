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
      <div
        onClick={() => goToPage(currentPage - 1)}
        className="md:flex items-center gap-1 border border-gray-200 rounded-md px-2 py-1 text-gray-800 text-sm hidden hover:cursor-pointer active:bg-gray-100"
      >
        <IoIosArrowBack />
        <button
          className="hover:opacity-75 hover:cursor-pointer disabled:opacity-40"
          disabled={currentPage <= 1}
        >
          Previous
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-1 w-[176px] sm:w-[284px] lg:w-[400px] xl:w-[600px]">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => goToPage(p)}
            className={`w-8 px-3 py-1 rounded border text-sm border-gray-200 hover:cursor-pointer flex items-center jutify-center ${
              p === currentPage
                ? "bg-purple-600 text-white border-purple-600"
                : "hover:bg-gray-50"
            }`}
          >
            <span>{p}</span>
          </button>
        ))}
      </div>
      <div
        onClick={() => goToPage(currentPage + 1)}
        className="md:flex items-center gap-1 border border-gray-200 rounded-md pr-3 pl-1 py-1 text-gray-800 text-sm hidden hover:cursor-pointer active:bg-gray-100"
      >
        <IoIosArrowForward />
        <button
          className="hover:opacity-75 hover:cursor-pointer disabled:opacity-40"
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationInventory;
