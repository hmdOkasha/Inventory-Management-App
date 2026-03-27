import React from "react";

const EfficiencyCircle = ({
  inStock,
  lowStock,
}: {
  inStock: number;
  lowStock: number;
}) => {
  const second = lowStock + inStock;
  return (
    <div
      style={{
        background: `conic-gradient(#7c3aed ${inStock}%, #d6b7f0 ${inStock}% ${second}%, #e5e7eb ${second}% 100%)`,
      }}
      className="w-50 h-50 rounded-full flex items-center justify-center mx-auto"
    >
      <div className="w-45 h-45 rounded-full bg-white flex flex-col items-center justify-center">
        <span className="text-2xl font-semibold">{inStock}%</span>
        <span className="text-sm text-gray-500">In Stock</span>
      </div>
    </div>
  );
};

export default EfficiencyCircle;
