"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useRef, useTransition } from "react";

const SearchInventory = ({ defaultValue }: { defaultValue: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", ref.current?.value ?? "");
    params.set("page", "1");
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };
  return (
    <div className="mt-3 min-w-full h-20 bg-white rounded-lg shadow-xs flex items-center px-5 py-1 gap-2">
      <input
        ref={ref}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        type="search"
        defaultValue={defaultValue}
        placeholder="Search Product"
        className={`border border-gray-300 h-10 rounded-md p-2 text-sm flex-1`}
      />
      <button
        onClick={handleSearch}
        className="h-10 w-25 rounded-md bg-purple-700 text-white font-semibold hover:opacity-75 active:bg-purple-900 hover:cursor-pointer"
      >
        {isPending ? (
          <div className="flex items-center justify-center">
            <div className="border-4 border-gray-300 border-b-white rounded-full h-5 w-5 animate-spin" />
          </div>
        ) : (
          <span>Search</span>
        )}
      </button>
    </div>
  );
};

export default SearchInventory;
