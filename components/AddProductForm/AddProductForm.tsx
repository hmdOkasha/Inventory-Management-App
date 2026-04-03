"use client";
import React from "react";
import { ActionState, createProduct } from "@/lib/createProduct";
import { useActionState } from "react";
import { create } from "domain";

const AddProductForm = () => {
  const initialState: ActionState = {};
  const [state, formAction, isPending] = useActionState(
    createProduct,
    initialState,
  );
  return (
    <div className="lg:w-1/2 w-full bg-white rounded-lg shadow-xs p-5 text-gray-500 text-lg">
      <form action={formAction} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label>Product Name *</label>
          <input
            name="name"
            type="text"
            className="w-full border border-gray-300 rounded-md h-10 py-1 px-3"
            required
            placeholder="Enter the name of the product"
          ></input>
          {state.errors?.name && (
            <p className="text-red-500 text-sm">{state.errors?.name[0]}</p>
          )}
        </div>
        <div className="flex gap-6">
          <div className="flex flex-1 flex-col gap-1">
            <label>Quantity *</label>
            <input
              name="quantity"
              type="number"
              className="w-full border border-gray-300 rounded-md h-10 py-1 px-3"
              required
              placeholder="Enter the quantity of your product"
            ></input>
            {state.errors?.quantity && (
              <p className="text-red-500 text-sm">
                {state.errors?.quantity[0]}
              </p>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <label>Price *</label>
            <input
              name="price"
              type="number"
              className="w-full border border-gray-300 rounded-md h-10 py-1 px-3"
              required
              placeholder="Enter the price of your product"
            ></input>
            {state.errors?.price && (
              <p className="text-red-500 text-sm">{state.errors?.price[0]}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label>SKU</label>
          <input
            name="sku"
            type="text"
            className="w-full border border-gray-300 rounded-md h-10 py-1 px-3"
            placeholder="Enter the name of the product"
          ></input>
          {state.errors?.sku && (
            <p className="text-red-500 text-sm">{state.errors?.sku[0]}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label>Low Stock At *</label>
          <input
            name="lowStockAt"
            type="number"
            className="w-full border border-gray-300 rounded-md h-10 py-1 px-3"
            required
            placeholder="Enter the low stock threshold"
          ></input>
          {state.errors?.lowStockAt && (
            <p className="text-red-500 text-sm">
              {state.errors?.lowStockAt[0]}
            </p>
          )}
          {state.message && (
            <p className="text-red-500 text-sm">{state.message}</p>
          )}
        </div>
        <div className="flex gap-5">
          <button
            type="submit"
            className="bg-purple-700 rounded-md text-white py-2 px-5 hover:opacity-50 hover:cursor-pointer active:bg-purple-900 active:opacity-100 w-36"
          >
            {isPending ? (
              <div className="flex items-center justify-center">
                <div className="border-4 border-gray-300 border-b-white rounded-full h-5 w-5 animate-spin" />
              </div>
            ) : (
              "Add Product"
            )}
          </button>
          <button className="bg-gray-200 rounded-md text-black py-2 px-5 hover:opacity-50 hover:cursor-pointer active:bg-gray-500 active:opacity-100">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
