import React from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import SearchInventory from "@/components/SearchInventory/SearchInventory";
import PaginationInventory from "@/components/PaginationInventory/PaginationInventory";
import getProducts from "@/lib/productsFetch";
import ProductsTable from "@/components/ProductsTable/ProductsTable";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const inventory = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: number; search?: string }>;
}) => {
  const { page: pageParam, search } = await searchParams;
  const page = Number(pageParam) || 1;
  const searchedWord = search ?? "";
  const { products, total, totalPages } = await getProducts({
    search: searchedWord,
    page,
  });

  const deleteProduct = async (id: string) => {
    "use server";
    await prisma.product.delete({
      where: { id },
    });
    revalidatePath("/inventory");
  };

  return (
    <div className="min-h-dvh bg-gray-100">
      <Sidebar currentPath="/inventory" />
      <main className="ml-64 p-8 min-h-dvh flex flex-col">
        {/* {Header} */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Inventory</h1>
            <p className="text-sm text-gray-500">
              Manage your products and track inventory levels
            </p>
          </div>
        </div>
        <SearchInventory defaultValue={searchedWord} />
        <div className="overflow-x-auto rounded-lg border border-gray-200 mt-4">
          <ProductsTable products={products} deleteProduct={deleteProduct} />
        </div>
        <PaginationInventory currentPage={page} totalPages={totalPages} />
      </main>
    </div>
  );
};

export default inventory;
