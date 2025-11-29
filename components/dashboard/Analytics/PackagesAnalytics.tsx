// components/dashboard/Analytics/PackagesAnalytics.tsx
"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { ChevronDown } from "lucide-react";
import { packagesAnalyticsData, availableYears } from "@/data/analyticsData";

const packageTypes = [
  "All",
  "Monthly",
  "Half Yearly",
  "Quarter Yearly",
  "Yearly",
  "Weekly",
];

const packageColors = {
  Weekly: "#FDE047",
  Monthly: "#86EFAC",
  "Quarter Yearly": "#93C5FD",
  "Half Yearly": "#C084FC",
  Yearly: "#FCA5A5",
};

const PackagesAnalytics = () => {
  const [selectedType, setSelectedType] = useState("All");
  const [selectedYear, setSelectedYear] = useState(2025);
  const [isYearOpen, setIsYearOpen] = useState(false);

  const data = packagesAnalyticsData;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-medium">
          Packages Analytics
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

      <div className="bg-white rounded-lg p-6 border border-gray-200">
        {/* Package Type Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {packageTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 text-sm rounded-md whitespace-nowrap transition-colors ${
                selectedType === type
                  ? "bg-gray-medium text-white"
                  : "text-gray-medium hover:bg-gray-100"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart */}
          <div className="lg:col-span-2">
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
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: "20px" }}
                    iconType="circle"
                  />
                  <Bar
                    dataKey="Weekly"
                    fill={packageColors.Weekly}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={20}
                  />
                  <Bar
                    dataKey="Monthly"
                    fill={packageColors.Monthly}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={20}
                  />
                  <Bar
                    dataKey="Quarter Yearly"
                    fill={packageColors["Quarter Yearly"]}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={20}
                  />
                  <Bar
                    dataKey="Half Yearly"
                    fill={packageColors["Half Yearly"]}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={20}
                  />
                  <Bar
                    dataKey="Yearly"
                    fill={packageColors.Yearly}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={20}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            {data.stats.map((stat, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4"
              >
                <p className="text-sm text-gray-medium mb-1">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-gray-medium">
                    {stat.count}
                    <span className="text-sm font-normal text-gray-medium ml-1">
                      {stat.unit}
                    </span>
                  </p>
                  {stat.percentage && (
                    <p className="text-sm text-gray-medium">{stat.percentage}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackagesAnalytics;
