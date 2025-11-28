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
  Legend,
} from "recharts";
import { financialsCompareData } from "@/data/analyticsData";

interface FinancialsCompareProps {
  onNewCompare: () => void;
}

const yearColors: Record<string, string> = {
  "2020": "#86EFAC",
  "2021": "#93C5FD",
  "2022": "#FCA5A5",
  "2023": "#FDE047",
  "2024": "#C084FC",
};

const FinancialsCompare: React.FC<FinancialsCompareProps> = ({
  onNewCompare,
}) => {
  const data = financialsCompareData;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#505050]">
          Financials Compare
        </h2>
        <button
          onClick={onNewCompare}
          className="px-4 py-2 bg-[#7C4DFF] text-white text-sm rounded-md hover:bg-[#6A3FE0] transition-colors flex items-center gap-2"
        >
          <span>📊</span>
          New Compare Analytics
        </button>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        {/* Legend */}
        <div className="flex justify-end gap-4 mb-6">
          {data.years.map((year) => (
            <div key={year} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: yearColors[year] }}
              />
              <span className="text-sm text-[#878787]">{year}</span>
            </div>
          ))}
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
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-[#505050]">
            Compare Details
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#505050]">
                  Year
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#505050]">
                  Income
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#505050]">
                  Expanse
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#505050]">
                  Net Income
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.tableData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-[#505050]">
                    {row.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#505050]">
                    {row.income}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#505050]">
                    {row.expense}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#505050]">
                    {row.netIncome}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
          <span className="text-lg font-semibold text-[#505050]">Balance</span>
          <span className="text-lg font-semibold text-[#505050]">
            {data.balance}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FinancialsCompare;
