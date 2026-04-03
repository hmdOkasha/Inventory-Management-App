import React from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import prisma from "@/lib/prisma";
import EfficiencyCircle from "@/components/EfficiencyCircle/EfficiencyCircle";
import DashboardChart from "@/components/DashboardChart/DashboardChart";
import { startOfWeek, format } from "date-fns";
import { syncUser } from "@/lib/syncUser";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";

const dashboard = async () => {
  const user = await syncUser();
  const userId = user.id;

  const getStockPercentages = async () => {
    const allProducts = await prisma.product.findMany({
      where: { userId },
      select: { quantity: true, lowStockAt: true },
    });

    let inStock = 0,
      lowStock = 0,
      outOfStock = 0;

    for (const item of allProducts) {
      if (item.quantity === 0) {
        outOfStock++;
        continue;
      }
      if (item.lowStockAt !== null && item.quantity <= item.lowStockAt) {
        lowStock++;
        continue;
      }
      inStock++;
    }

    const total = allProducts.length;
    return {
      inStockPercentage: Number(((inStock / total) * 100).toFixed(1)),
      lowStockPercentage: Number(((lowStock / total) * 100).toFixed(1)),
      outOfStockPercentage: ((outOfStock / total) * 100).toFixed(1),
    };
  };

  const [
    products,
    newProducts,
    productStats,
    { inStockPercentage, lowStockPercentage, outOfStockPercentage },
  ] = await Promise.all([
    prisma.product.findMany({
      where: { userId },
      orderBy: { quantity: "asc" },
      take: 5,
      select: { name: true, quantity: true, lowStockAt: true },
    }),
    prisma.product.findMany({
      where: { createdAt: { gte: new Date("2026-02-18") }, userId },
      select: { createdAt: true },
    }),
    prisma.product.findMany({
      where: { userId },
      select: { price: true, lowStockAt: true, quantity: true },
    }),
    getStockPercentages(),
  ]);

  const getNewProductsPerWeek = () => {
    const weekMap: Record<string, number> = {};

    for (const product of newProducts) {
      const weekStart = startOfWeek(product.createdAt, { weekStartsOn: 3 });
      const label = format(weekStart, "MM/dd");
      weekMap[label] = (weekMap[label] ?? 0) + 1;
    }

    const chartData = Object.entries(weekMap)
      .map(([date, value]) => ({ date, value }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return chartData;
  };

  const getStockColor = (
    quantity: number,
    lowStock: number | null,
    isText: boolean,
  ) => {
    if (lowStock === null) {
      return isText ? "text-green-500" : "bg-green-500";
    }
    if (quantity === lowStock) {
      return isText ? "text-yellow-500" : "bg-yellow-500";
    }
    if (quantity > lowStock) {
      return isText ? "text-green-500" : "bg-green-500";
    } else {
      return isText ? "text-red-500" : "bg-red-500";
    }
  };

  const getStats = () => {
    const totalProducts = productStats.length;
    const { priceSum, lowStockCount } = productStats.reduce(
      (acc, product) => ({
        priceSum: acc.priceSum + Number(product.price),
        lowStockCount:
          product.lowStockAt !== null && product.lowStockAt >= product.quantity
            ? acc.lowStockCount + 1
            : acc.lowStockCount,
      }),
      { priceSum: 0, lowStockCount: 0 },
    );
    const priceSumRounded = priceSum.toFixed(0);
    return { totalProducts, priceSumRounded, lowStockCount };
  };

  const { totalProducts, priceSumRounded, lowStockCount } = getStats();

  return (
    <div className="min-h-dvh bg-gray-100">
      <Sidebar currentPath="/dashboard" />
      <main className="md:ml-64 md:mt-0 mt-12 md:p-8 p-1 min-h-dvh flex flex-col">
        {/* {Header} */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500">
              Welcome back! Here is an overview of your inventory
            </p>
          </div>
        </div>
        {/* {Key Metrics} */}
        <div className="flex-1 min-w-full h-100 md:grid-cols-2 md:grid-rows-[1fr_1.3fr] xl:gap-8 lg:gap-6 gap-3 grid grid-rows-4 grid-cols-1">
          <div className="rounded-lg bg-white p-5">
            <div className="mb-10">
              <span className="font-semibold text-xl">Key metrics</span>
            </div>
            <div className="2xl:px-24 lg:px-4 px-2 flex items-center justify-between md:flex-row flex-col gap-4">
              <div className="flex flex-col items-center gap-1">
                <span className="font-semibold xl:text-3xl text-lg">
                  {totalProducts}
                </span>
                <span className="text-gray-500 text-sm">Total Products</span>
                <div className="flex items-center gap-1">
                  <span className="text-green-600 text-xs font-semibold">
                    +{totalProducts}
                  </span>
                  <FaArrowTrendUp className="w-4 text-green-600" />
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="font-semibold xl:text-3xl text-lg">
                  ${priceSumRounded}
                </span>
                <span className="text-gray-500 text-sm">Total Value</span>
                <div className="flex items-center gap-1">
                  <span className="text-green-600 text-xs font-semibold">
                    +{priceSumRounded}
                  </span>
                  <FaArrowTrendUp className="w-4 text-green-600" />
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="font-semibold xl:text-3xl text-lg">
                  {lowStockCount}
                </span>
                <span className="text-gray-500 text-sm">Low Stock</span>
                <div className="flex items-center gap-1">
                  <span className="text-red-600 text-xs font-semibold">
                    +{lowStockCount}
                  </span>
                  <FaArrowTrendDown className="w-4 text-red-600" />
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-white p-5">
            <div className="mb-10">
              <span className="font-semibold text-xl">
                New Products per week
              </span>
            </div>
            <DashboardChart chartData={getNewProductsPerWeek()} />
          </div>
          <div className="rounded-lg bg-white p-5">
            <div className="mb-5">
              <span className="font-semibold text-xl">Stock levels</span>
            </div>
            <div className="flex flex-col gap-5 items-center min-w-full">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="min-w-full h-12 bg-gray-100 rounded-lg py-3 px-4 flex items-center gap-3"
                >
                  <div
                    className={`w-4 h-4 rounded-full ${getStockColor(product.quantity, product.lowStockAt, false)}`}
                  ></div>
                  <span className="mb-[2px]">{product.name}</span>
                  <span
                    className={`ml-auto ${getStockColor(product.quantity, product.lowStockAt, true)}`}
                  >
                    {product.quantity} units
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg bg-white p-5">
            <div className="mb-5">
              <span className="font-semibold text-xl">Efficiency</span>
            </div>
            <EfficiencyCircle
              inStock={inStockPercentage}
              lowStock={lowStockPercentage}
            />
            <div className="mt-12">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 rounded-full bg-[#7c3aed]"></div>
                <span className="text-gray-800 text-md">
                  In Stock ({inStockPercentage}%)
                </span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 rounded-full bg-[#d6b7f0]"></div>
                <span className="text-gray-800 text-md">
                  Low Stock ({lowStockPercentage}%)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#e5e7eb]"></div>
                <span className="text-gray-800 text-md">
                  Out of Stock ({outOfStockPercentage}%)
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default dashboard;
