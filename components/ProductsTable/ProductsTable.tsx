"use client";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import SortableHeader from "../SortableHeader/SortableHeader";
import { useSearchParams } from "next/navigation";

const ProductsTable = ({
  products,
  deleteProduct,
}: {
  products: {
    id: string;
    name: string;
    sku: string | null;
    price: string;
    quantity: number;
    lowStockAt: number | null;
  }[];
  deleteProduct: (id: string) => Promise<void>;
}) => {
  const searchParams = useSearchParams();
  const selectedColumn = searchParams.get("sortBy");

  const colClass = (column: string) =>
    `px-6 py-4 transition-colors ${column === selectedColumn ? "bg-gray-50" : ""}`;
  return (
    <table className="w-full text-sm bg-white table-fixed min-w-[600px]">
      <thead className="bg-gray-50 text-gray-500 uppercase text-semibold md:text-sm text-xs">
        <tr>
          <SortableHeader label="Name" column="name" className="w-[20%]" />
          <th className="px-6 py-3 text-left w-[15%]">SKU</th>
          <SortableHeader label="Price" column="price" className=" w-[15%]" />
          <SortableHeader
            label="Quantity"
            column="quantity"
            className="w-[17.5%]"
          />
          <SortableHeader
            label="Low Stock At"
            column="lowStockAt"
            className="w-[17.5%]"
          />
          <th className="px-6 py-3 text-left we-[15%]">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 md:text-sm text-xs">
        {products.map((product) => (
          <tr key={product.id} className="hover:bg-gray-50">
            <td className={`${colClass("name")}`}>{product.name}</td>
            <td className="px-6 py-4">{product.sku ?? "-"}</td>
            <td className={colClass("price")}>${product.price}</td>
            <td className={colClass("quantity")}>{product.quantity}</td>
            <td className={colClass("lowStockAt")}>{product.lowStockAt}</td>
            <td className="px-6 py-4">
              <Dialog>
                <DialogTrigger>
                  <div className="text-red-500 hover:text-red-700 hover:cursor-pointer">
                    Delete
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <div className="m-auto">
                    <div className="text-2xl text-center">
                      Are you sure you want to delete {product.name}?
                    </div>
                    <div className="flex flex-row items-center justify-evenly mt-4">
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="bg-green-500 py-1 px-3 font-semibold text-2xl hover:cursor-pointer hover:opacity-50 active:bg-green-700 rounded-md text-white"
                      >
                        Yes
                      </button>
                      <DialogClose>
                        <div className=" bg-red-500 py-1 px-3 font-semibold text-2xl hover:cursor-pointer hover:opacity-50 active:bg-red-700 rounded-md text-white">
                          No
                        </div>
                      </DialogClose>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductsTable;
