"use client";
import React, { useState } from "react";
import { Package, BarChart3, Plus, Settings, X } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@stackframe/stack";
import { RxHamburgerMenu } from "react-icons/rx";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Add Product", href: "/add-product", icon: Plus },
  { name: "Settings", href: "/settings", icon: Settings },
];

const NavContent = ({
  currentPath,
  onClose,
}: {
  currentPath: string;
  onClose?: () => void;
}) => (
  <div className="fixed left-0 top-0 bg-gray-900 text-white w-64 min-h-screen p-6 z-10">
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-7 h-7" />
          <span className="text-lg font-semibold">Inventory App</span>
        </div>
        {onClose && (
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
    <nav className="space-y-1 flex-1">
      {navigation.map((item, key) => {
        const IconComponent = item.icon;
        const isActive = currentPath === item.href;
        return (
          <Link
            href={item.href}
            key={key}
            onClick={onClose}
            className={`${
              isActive
                ? "bg-purple-100 text-gray-800"
                : "text-gray-300 hover:bg-gray-800"
            } px-3 flex items-center space-x-3 py-2 rounded-lg`}
          >
            <IconComponent />
            <span className="text-sm">{item.name}</span>
          </Link>
        );
      })}
    </nav>
    <div className="absolute bottom-0 left-0 right-0 p-6 borter-t border-gray-700">
      <div className="flex items-center justify-between">
        <UserButton showUserInfo />
      </div>
    </div>
  </div>
);

const Sidebar = ({ currentPath = "/dashboard" }: { currentPath: string }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded-lg"
        onClick={() => setMobileOpen(true)}
      >
        <RxHamburgerMenu className="w-5 h-5" />
      </button>
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <div
        className={`md:hidden fixed left-0 top-0 bg-gray-900 text-white w-64 min-h-screen p-6 z-50 transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <NavContent
          currentPath={currentPath}
          onClose={() => setMobileOpen(false)}
        />
      </div>
      <div className="hidden md:flex fixed left-0 top-0 bg-gray-900 text-white w-64 min-h-screen p-6 z-40 flex-col">
        <NavContent currentPath={currentPath} />
      </div>
    </>
  );
};

export default Sidebar;
