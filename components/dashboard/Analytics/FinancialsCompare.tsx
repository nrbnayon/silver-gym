// components/dashboard/Analytics/FinancialsCompare.tsx
"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { getFinancialsCompareData } from "@/data/analyticsData";
import { HugeiconsIcon } from "@hugeicons/react";
import { AnalyticsDownIcon } from "@hugeicons/core-free-icons";

interface FinancialsCompareProps {
  onNewCompare: () => void;
  selectedOptions: string[];
  startYear: number;
  endYear: number;
}

const yearColors: Record<string, string> = {
  "2020": "#B7B976",
  "2021": "#F1EBCC",
  "2022": "#E6957F",
  "2023": "#64667C",
  "2024": "#9AC1AE",
  "2025": "#F1EBCC",
  "2026": "#E6957F",
  "2027": "#64667C",
  "2028": "#9AC1AE",
  "2029": "#F1EBCC",
  "2030": "#E6957F",
};

const FinancialsCompare: React.FC<FinancialsCompareProps> = ({
  onNewCompare,
  selectedOptions,
  startYear,
  endYear,
}) => {
  const data = getFinancialsCompareData(selectedOptions[0] || "income", startYear, endYear);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div></div>
        <button
          onClick={onNewCompare}
          className="px-4 py-2.5 bg-purple text-white text-sm rounded-md hover:bg-[#6A3FE0] transition-colors flex items-center justify-center gap-2 cursor-pointer md:text-base"
        >
          <HugeiconsIcon icon={AnalyticsDownIcon} />
          New Compare Analytics
        </button>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl p-4">
        
        {/* Legend */}
        <div className="flex justify-between items-center gap-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-medium">
          Financials Compare
        </h2>
          <div className="flex items-center gap-4">
            {data.years.map((year) => (
            <div key={year} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-xs"
                style={{ backgroundColor: yearColors[year] }}
              />
              <span className="text-sm text-gray-medium">{year}</span>
            </div>
          ))}
          </div>
        </div>

        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data.chartData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#878787", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#878787", fontSize: 12 }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                }}
              />
              {data.years.map((year) => (
                <Bar
                  key={year}
                  dataKey={year}
                  fill={yearColors[year]}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={30}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Compare Details Table */}
      <div className="bg-white rounded-2xl border-8 border-gray-secondary overflow-hidden p-3">
        <div className="px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-medium">
            Compare Details
          </h3>
        </div>

        <div className="overflow-auto">
          <table className="w-full border-separate border-spacing-y-0.5 border border-border-2 rounded-lg px-2">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-base font-semibold text-text-primary border-b">
                  Year
                </th>
                <th className="px-6 py-4 text-left text-base font-semibold text-text-primary border-b">
                  Income
                </th>
                <th className="px-6 py-4 text-center text-base font-semibold text-text-primary border-b">
                  Expanse
                </th>
                <th className="px-6 py-4 text-right text-base font-semibold text-text-primary border-b">
                  Net Income
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 overflow-y-auto">
              {data.tableData.map((row, index) => (
                <tr key={index} className={`transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-primary"
                  } hover:bg-[#F2EEFF] rounded-md`}>
                  <td className="px-6 py-4 text-sm text-gray-medium rounded-l-md">
                    {row.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-medium">
                    {row.income}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-medium">
                    {row.expense}
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-gray-medium rounded-r-md">
                    {row.netIncome}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4 bg-gray-primary p-4 rounded-lg">
          <span className="text-lg font-semibold text-gray-medium">Balance</span>
          <span className="text-lg font-semibold text-gray-medium">
            {data.balance}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FinancialsCompare;