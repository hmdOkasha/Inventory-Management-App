"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaCircle } from "react-icons/fa";

const SortableHeader = ({
  label,
  column,
  className = "",
}: {
  label: string;
  column: string;
  className?: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSortColumn = searchParams.get("sortBy");
  const currentSortOrder = searchParams.get("sortOrder") ?? "asc";
  const isActive = currentSortColumn === column;

  const handleSort = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", column);
    params.set(
      "sortOrder",
      isActive && currentSortOrder === "asc" ? "desc" : "asc",
    );
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <th
      onClick={handleSort}
      className={`px-6 py-3 text-left hover:cursor-pointer relative ${className}`}
    >
      <div className="flex items-center md:gap-1">
        <div>{label}</div>

        <div className="relative flex items-center justify-center w-4 h-4 shrink-0">
          <FaCircle
            className={`w-2 h-2 absolute transition-opacity ${!isActive ? "opacity-100" : "opacity-0"}`}
          />
          <IoIosArrowDown
            className={`absolute transition-opacity ${isActive && currentSortOrder === "asc" ? "opacity-100" : "opacity-0"}`}
          />
          <IoIosArrowUp
            className={`absolute transition-opacity ${isActive && currentSortOrder === "desc" ? "opacity-100" : "opacity-0"}`}
          />
        </div>
      </div>
      <div
        className={`${isActive && currentSortColumn === column ? "absolute bottom-0 left-0 w-full h-1 bg-purple-600 opacity-100" : "opacity-0"}`}
      ></div>
    </th>
  );
};

export default SortableHeader;
