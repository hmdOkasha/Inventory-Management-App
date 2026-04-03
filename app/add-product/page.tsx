import React, { SubmitEventHandler } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import AddProductForm from "@/components/AddProductForm/AddProductForm";

const addProduct = async () => {
  return (
    <div className="min-h-dvh bg-gray-100">
      <Sidebar currentPath="/add-product" />
      <main className="md:ml-64 md:mt-0 mt-12 md:p-8 p-1 min-h-dvh flex flex-col">
        {/* {Header} */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Add product
            </h1>
            <p className="text-sm text-gray-500">
              Add a new product to your inventory
            </p>
          </div>
        </div>
        <AddProductForm />
      </main>
    </div>
  );
};

export default addProduct;
