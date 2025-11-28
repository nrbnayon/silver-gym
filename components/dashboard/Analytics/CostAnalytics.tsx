// components/dashboard/Analytics/CostAnalytics.tsx
"use client";

import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from "recharts";
import { ChevronDown } from "lucide-react";
import { costAnalyticsData, availableYears } from "@/data/analyticsData";
import { CostCategory } from "@/types/analytics";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

const months = [
  "All Months",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CustomTooltip = (props: TooltipProps<ValueType, NameType>) => {
  const { active, payload } = props as {
    active?: boolean;
    payload?: Array<{ payload: CostCategory; value?: number }>;
  };

  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm font-semibold text-gray-medium">{data.name}</p>
        <p className="text-sm text-[#878787]">{data.percentage}%</p>
      </div>
    );
  }
  return null;
};

const CostAnalytics = () => {
  const [selectedMonth, setSelectedMonth] = useState("All Months");
  const [selectedYear, setSelectedYear] = useState(2025);
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);

  const data = costAnalyticsData;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-medium">
          Cost Analytics
        </h2>
        <div className="relative">
          <button
            onClick={() => setIsYearOpen(!isYearOpen)}
            className="px-4 py-2 bg-gray-100 text-gray-medium text-sm rounded-md flex items-center gap-2 hover:bg-gray-200 transition-colors min-w-[100px] justify-between"
          >
            {selectedYear}
            <ChevronDown className="w-4 h-4" />
          </button>
          {isYearOpen && (
            <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[100px] z-10">
              {availableYears.map((year) => (
                <button
                  key={year}
                  onClick={() => {
                    setSelectedYear(year);
                    setIsYearOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors ${
                    selectedYear === year
                      ? "text-gray-medium font-semibold"
                      : "text-[#878787]"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <button
              onClick={() => setIsMonthOpen(!isMonthOpen)}
              className="px-4 py-2 bg-gray-100 text-gray-medium text-sm rounded-md flex items-center gap-2 hover:bg-gray-200 transition-colors min-w-[140px] justify-between"
            >
              {selectedMonth}
              <ChevronDown className="w-4 h-4" />
            </button>
            {isMonthOpen && (
              <div className="absolute top-full mt-2 left-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[140px] z-10 max-h-60 overflow-y-auto">
                {months.map((month) => (
                  <button
                    key={month}
                    onClick={() => {
                      setSelectedMonth(month);
                      setIsMonthOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors ${
                      selectedMonth === month
                        ? "text-gray-medium font-semibold"
                        : "text-[#878787]"
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="text-right">
            <p className="text-2xl font-bold text-gray-medium">
              {data.totalCost}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-[280px] h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.categories as any}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                    startAngle={90}
                    endAngle={450}
                  >
                    {data.categories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-medium">$79K</p>
                  <p className="text-sm text-[#878787]">Total</p>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-6">
              {data.categories.map((category, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm text-gray-medium">
                    {category.name}
                  </span>
                  <span className="text-sm text-[#878787]">
                    {category.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Expense List */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-medium mb-4">Salary</h3>
            {data.categories.map((category, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm text-gray-medium">
                    {category.name}
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-medium">
                  {category.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostAnalytics;
