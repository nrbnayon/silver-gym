// components/dashboard/Analytics/PackagesAnalytics.tsx
"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ChevronDown } from "lucide-react";
import { getPackagesAnalyticsData, availableYears } from "@/data/analyticsData";

const packageTypes = [
  "All",
  "Monthly",
  "Half Yearly",
  "Quarter Yearly",
  "Yearly",
  "Weekly",
];

const packageColors = {
  Weekly: "#B7B976",
  Yearly: "#F1EBCC",
  "Quarter Yearly": "#E6957F",
  "Half Yearly": "#64667C",
  Monthly: "#9AC1AE",
};

const PackagesAnalytics = () => {
  const [selectedType, setSelectedType] = useState("All");
  const [selectedYear, setSelectedYear] = useState(2025);
  const [isYearOpen, setIsYearOpen] = useState(false);

  const data = getPackagesAnalyticsData(selectedYear);

  // Filter chart data based on selected type
  const filteredChartData = selectedType === "All" 
    ? data.chartData 
    : data.chartData.map(item => ({
        month: item.month,
        [selectedType]: item[selectedType as keyof typeof item]
      }));

  return (
    <div className="bg-white rounded-2xl p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Packages Analytics
        </h2>
        <div className="relative">
          <button
            onClick={() => setIsYearOpen(!isYearOpen)}
            className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-md flex items-center gap-2 hover:bg-gray-200 transition-colors min-w-[100px] justify-between"
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
                      ? "text-gray-800 font-semibold"
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

      {/* Package Type Filters and Legend */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 pb-4 border-b border-gray-200">
        {/* Package Type Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide w-full lg:w-auto">
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

        {/* Vertical Divider - Hidden on mobile */}
        <div className="hidden lg:block"></div>

        {/* Legend */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-xs bg-[#B7B976]"></div>
            <span className="text-sm text-gray-medium">Weekly</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-xs bg-[#F1EBCC]"></div>
            <span className="text-sm text-gray-medium">Yearly</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-xs bg-[#E6957F]"></div>
            <span className="text-sm text-gray-medium">Quarter Yearly</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-xs bg-[#64667C]"></div>
            <span className="text-sm text-gray-medium">Half Yearly</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-xs bg-[#9AC1AE]"></div>
            <span className="text-sm text-gray-medium">Monthly</span>
          </div>
        </div>
      </div>

      {/* Chart and Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 md:border-r border-border-2 pr-0 md:pr-4">
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filteredChartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  tickFormatter={(value) => `${value / 1000}K`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                />
                {(selectedType === "All" || selectedType === "Weekly") && (
                  <Bar
                    dataKey="Weekly"
                    fill={packageColors.Weekly}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={20}
                  />
                )}
                {(selectedType === "All" || selectedType === "Yearly") && (
                  <Bar
                    dataKey="Yearly"
                    fill={packageColors.Yearly}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={20}
                  />
                )}
                {(selectedType === "All" || selectedType === "Quarter Yearly") && (
                  <Bar
                    dataKey="Quarter Yearly"
                    fill={packageColors["Quarter Yearly"]}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={20}
                  />
                )}
                {(selectedType === "All" || selectedType === "Half Yearly") && (
                  <Bar
                    dataKey="Half Yearly"
                    fill={packageColors["Half Yearly"]}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={20}
                  />
                )}
                {(selectedType === "All" || selectedType === "Monthly") && (
                  <Bar
                    dataKey="Monthly"
                    fill={packageColors.Monthly}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={20}
                  />
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats - First card with bottom border only, rest with full border */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-base font-semibold text-text-primary mb-1">Total Members</p>
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-xl md:text-2xl font-bold text-text-primary">
                {data.stats[0].count}
                <span className="text-sm font-normal text-gray-medium ml-1">
                  {data.stats[0].unit}s
                </span>
              </p>
            </div>
          </div>
          {data.stats.slice(1).map((stat, index) => (
            <div
              key={index}
              className= "border-b border-border-2 last:border-b-0 px-4 py-3 flex items-center justify-between gap-2"
            >
              <p className="text-sm text-gray-medium mb-1">{stat.label}</p>
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-xl md:text-2xl font-bold text-text-primary">
                  {stat.count}
                  <span className="text-sm font-normal text-gray-medium ml-1">
                    {stat.unit}
                  </span>
                </p>
                {stat.percentage && (
                  <p className="text-sm text-gray-medium bg-gray-100 px-2 py-1 rounded">
                    {stat.percentage}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackagesAnalytics;