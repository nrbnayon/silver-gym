"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { ChevronDown } from "lucide-react";
import { getFinancialData, availableYears } from "@/data/analyticsData";

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
    return (
      <div className="bg-white px-4 py-3 rounded-lg shadow-lg border border-gray-200">
        <p className="text-xs text-gray-medium mb-2">
          {payload[0]?.payload?.period}
        </p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-medium capitalize">
                {entry.name}
              </span>
            </div>
            <span className="text-sm font-semibold text-gray-medium">
              {Number(entry.value).toLocaleString()} TK
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const FinancialAnalytics = () => {
  const [selectedMonth, setSelectedMonth] = useState("All Months");
  const [selectedYear, setSelectedYear] = useState(2025);
  const [isYearOpen, setIsYearOpen] = useState(false);

  const currentData = getFinancialData(selectedMonth, selectedYear);

  return (
    <div className="bg-white rounded-2xl p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-medium">
          Financial analytics
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
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-medium rounded-xs"></div>
            <span className="text-sm text-gray-medium">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary-500 rounded-xs"></div>
            <span className="text-sm text-gray-medium">Expense</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="flex flex-col md:flex-row justify-between items-center md:gap-5">
        <div className="w-full h-[200px] md:h-[300px] md:border-r border-border-2 pr-0 md:pr-4 ">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={currentData.data}
              margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#F0F0F0"
                vertical={false}
              />
              <XAxis
                dataKey="period"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#878787", fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#878787", fontSize: 12 }}
                tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#000000"
                strokeWidth={2}
                dot={{ fill: "#000000", r: 3 }}
                activeDot={{ r: 5 }}
                name="Income"
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#EF4444"
                strokeWidth={2}
                dot={{ fill: "#EF4444", r: 3 }}
                activeDot={{ r: 5 }}
                name="Expense"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flexflex-row md:flex-col justify-between items-center w-full h-full md:w-[30%]">
          {/* Metrics */}
          <div className="md:space-y-4">
            {/* Total Income */}
            <div className="border-b p-2 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-medium mb-1">Total Income</p>
                <p className="text-lg md:text-2xl font-bold text-gray-medium">
                  {currentData.metrics.totalIncome}
                </p>
              </div>
              <p className="text-sm text-green-500 bg-[#ECF6F0] p-2 rounded-md">
                {currentData.metrics.incomeChange}
              </p>
            </div>

            {/* Total Expense */}
            <div className="border-b p-2 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-medium mb-1">Total Expense</p>
                <p className="text-lg md:text-2xl font-bold text-gray-medium">
                  {currentData.metrics.totalExpense}
                </p>
              </div>
              <p className="text-sm text-red-500 bg-[#FFE8E8] p-2 rounded-md">
                {currentData.metrics.expenseChange}
              </p>
            </div>

            {/* Total Net Income */}
            <div className="p-2 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-medium mb-1">
                  Total Net Income
                </p>
                <p className="text-lg md:text-2xl font-bold text-gray-medium">
                  {currentData.metrics.totalNetIncome}
                </p>
              </div>
              <p className="text-sm text-green-500 bg-[#ECF6F0] p-2 rounded-md">
                {currentData.metrics.netIncomeChange}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialAnalytics;
