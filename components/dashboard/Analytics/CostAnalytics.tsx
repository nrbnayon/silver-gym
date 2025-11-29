// components/dashboard/Analytics/CostAnalytics.tsx
"use client";

import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ChevronDown } from "lucide-react";
import { getCostAnalyticsData, availableYears } from "@/data/analyticsData";

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

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white px-4 py-3 rounded-lg shadow-lg border-border">
        <p className="text-sm font-semibold text-gray-800 mb-1">{data.name}</p>
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-gray-600">Amount:</span>
          <span className="text-sm font-semibold text-gray-800">{data.amount}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-gray-600">Percentage:</span>
          <span className="text-sm font-semibold text-gray-800">{data.percentage}%</span>
        </div>
      </div>
    );
  }
  return null;
};

const CostAnalytics = () => {
  const [selectedMonth, setSelectedMonth] = useState("All Months");
  const [selectedYear, setSelectedYear] = useState(2025);
  const [isYearOpen, setIsYearOpen] = useState(false);

  const data = getCostAnalyticsData(selectedMonth, selectedYear);

  // Calculate total cost from categories
  const totalCostValue = data.categories.reduce((sum, cat) => {
    const amount = parseFloat(cat.amount.replace(/,/g, ''));
    return sum + amount;
  }, 0);

  const formatTotalCost = (value: number) => {
    return `${(value / 1000).toFixed(0)}K`;
  };

  return (
    <div className="bg-white rounded-2xl p-4">
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
                      : "text-gray-medium"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-2 my-3 overflow-x-auto pb-2 scrollbar-hide false justify-between items-center border-b border-border-2">
        {months.map((month) => (
          <button
            key={month}
            onClick={() => setSelectedMonth(month)}
            className={`px-4 py-2 text-sm rounded-md whitespace-nowrap transition-colors ${
              selectedMonth === month
                ? "bg-gray-medium text-white"
                : "text-gray-medium hover:bg-gray-100"
            }`}
          >
            {month}
          </button>
        ))}
        <div className="h-4 border bg-gray-200"></div>
        {/* Legend */}
        <div className="flex justify-end gap-4 md:w-[15%]">
          <div className="text-right">
            <p className="text-lg md:text-2xl font-bold text-gray-medium">
              {data.totalCost}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-0 md:gap-8">
        {/* Pie Chart */}
        <div className="w-full md:w-[60%] flex flex-col md:flex-row justify-center md:justify-between items-center gap-2 md:gap-8 md:border-r border-border-2 pr-0 md:pr-4">
          <div className="border border-[#C3C3C3] rounded-full relative w-full max-w-[280px] h-[280px] mx-auto md:mx-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.categories as any}
                  cx="50%"
                  cy="50%"
                  innerRadius={75}
                  outerRadius={130}
                  paddingAngle={2}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                  cornerRadius={8}
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
                <p className="text-3xl font-bold text-gray-medium">${formatTotalCost(totalCostValue)}</p>
                <p className="text-sm text-gray-medium">Total</p>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="w-full">
            {data.categories.map((category, index) => (
              <div
                key={index}
                className="flex justify-between items-center w-full md:h-auto mb-4"
              >
                {/* Color and Title */}
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-sm"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm text-text-secondary font-medium">
                    {category.name}
                  </span>
                </div>

                {/* Percentage */}
                <span className="text-sm text-text-secondary font-medium">
                  {category.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Expense List */}
        <div className="w-full md:w-[40%] space-y-1">
          {data.categories.map((category, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 bg-gray-primary rounded-md"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-sm text-text-primary font-semibold">
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
  );
};

export default CostAnalytics;