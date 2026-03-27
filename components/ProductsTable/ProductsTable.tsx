"use client";
import React from "react";
import { Decimal } from "@prisma/client/runtime/index-browser";

const ProductsTable = ({
  products,
  deleteProduct,
}: {
  products: {
    id: string;
    name: string;
    sku: string | null;
    price: Decimal;
    quantity: number;
    lowStockAt: number | null;
  }[];
  deleteProduct: (id: string) => Promise<void>;
}) => {
  return (
    <table className="w-full text-sm bg-white">
      <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
        <tr>
          <th className="px-6 py-3 text-left">Name</th>
          <th className="px-6 py-3 text-left">SKU</th>
          <th className="px-6 py-3 text-left">Price</th>
          <th className="px-6 py-3 text-left">Quantity</th>
          <th className="px-6 py-3 text-left">Low Stock At</th>
          <th className="px-6 py-3 text-left">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {products.map((product) => (
          <tr key={product.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 text-gray-900">{product.name}</td>
            <td className="px-6 py-4 text-gray-500">{product.sku ?? "-"}</td>
            <td className="px-6 py-4">${product.price.toString()}</td>
            <td className="px-6 py-4">{product.quantity}</td>
            <td className="px-6 py-4">{product.lowStockAt}</td>
            <td className="px-6 py-4">
              <button
                onClick={() => deleteProduct(product.id)}
                className="text-red-500 hover:text-red-700 hover:cursor-pointer"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductsTable;
