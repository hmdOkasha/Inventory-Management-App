"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "07/06", value: 2 },
  { date: "07/13", value: 1 },
  { date: "07/20", value: 5 },
  { date: "07/27", value: 2 },
  { date: "08/3", value: 7 },
  { date: "08/10", value: 3 },
  // ...
];

const DashboardChart = ({
  chartData,
}: {
  chartData: { date: string; value: number }[];
}) => {
  return (
    <div className="flex items-center">
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#7c3aed"
            fill="#7c3aed"
            fillOpacity={0.2}
            dot={{ fill: "#7c3aed", r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;
