import Sidebar from "@/components/Sidebar/Sidebar";
import { AccountSettings } from "@stackframe/stack";
import React from "react";

const settings = () => {
  return (
    <div className="min-h-dvh bg-gray-100">
      <Sidebar currentPath="/settings" />
      <main className="md:ml-64 md:mt-0 mt-12 md:p-8 p-1 min-h-dvh flex flex-col">
        {/* {Header} */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Inventory</h1>
            <p className="text-sm text-gray-500">
              Manage your products and track inventory levels
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <AccountSettings fullPage />
        </div>
      </main>
    </div>
  );
};

export default settings;
