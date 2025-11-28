// components/dashboard/Common/BarChartCard.tsx
"use client";

import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from "recharts";
import { TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

interface BarChartData {
  month: string;
  value: number;
}

interface BarChartCardProps {
  title: string;
  yearlyData: BarChartData[];
  monthlyData: BarChartData[];
  totalValue: string;
  subtitle?: string;
  showToggle?: boolean;
  highColor?: string;
  lowColor?: string;
}

const CustomTooltip = (props: TooltipProps<ValueType, NameType>) => {
  const { active, payload } = props as {
    active?: boolean;
    payload?: { payload?: BarChartData; value?: number }[];
  };

  if (active && payload && payload.length && payload[0].payload) {
    return (
      <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm font-semibold text-gray-medium">
          {payload[0].payload.month}
        </p>
        <p className="text-sm text-text-secondary">
          ${Number(payload[0].value).toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const BarChartCard: React.FC<BarChartCardProps> = ({
  title,
  yearlyData,
  monthlyData,
  totalValue,
  subtitle,
  showToggle = true,
  highColor = "#E16349",
  lowColor = "#F9E0DB",
}) => {
  const [viewMode, setViewMode] = useState<"Yearly" | "Monthly">("Yearly");
  const [isOpen, setIsOpen] = useState(false);

  const currentData = viewMode === "Yearly" ? yearlyData : monthlyData;

  const maxValue = Math.max(...currentData.map((item) => item.value));
  const minValue = Math.min(...currentData.map((item) => item.value));
  const threshold = minValue + (maxValue - minValue) * 0.5;

  const getBarColor = (value: number) => {
    return value > threshold ? highColor : lowColor;
  };

  const handleToggle = (mode: "Yearly" | "Monthly") => {
    setViewMode(mode);
    setIsOpen(false);
  };

  return (
    <div className="w-full bg-white rounded-[20px] p-6 md:p-8 flex flex-col border-8 border-gray-secondary">
      <div className="flex justify-between items-center mb-3 flex-wrap gap-4">
        <h2 className="text-lg md:text-xl font-semibold text-gray-medium">
          {title}
        </h2>
        {showToggle && (
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="px-4 py-2 bg-gray-100 text-gray-medium text-sm rounded-sm flex items-center gap-2 hover:bg-gray-200 transition-colors"
            >
              {viewMode}
              <ChevronDown className=" w-4 h-4" />
            </button>
            {isOpen && (
              <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[120px] z-10">
                <button
                  onClick={() => handleToggle("Yearly")}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-primary transition-colors ${
                    viewMode === "Yearly"
                      ? "text-gray-medium font-semibold"
                      : "text-text-secondary"
                  }`}
                >
                  Yearly
                </button>
                <button
                  onClick={() => handleToggle("Monthly")}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-primary transition-colors ${
                    viewMode === "Monthly"
                      ? "text-gray-medium font-semibold"
                      : "text-text-secondary"
                  }`}
                >
                  Monthly
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="mb-4">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-medium">
            {totalValue}
          </h3>
          {subtitle && (
            <p className="text-sm text-text-secondary mt-2">{subtitle}</p>
          )}
        </div>

        <div className="flex flex-col items-center gap-4 mb-4 text-xs text-text-secondary">
          <div className="flex items-center gap-2">
            <span>Lowest</span>
            <div
              className="w-8 h-2 rounded"
              style={{ backgroundColor: lowColor }}
            />
          </div>
          <div className="flex items-center gap-2">
            <span>Highest</span>
            <div
              className="w-8 h-2 rounded"
              style={{ backgroundColor: highColor }}
            />
          </div>
        </div>
      </div>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={currentData}
            margin={{ top: 20, right: 10, left: -20, bottom: 5 }}
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
              tickFormatter={(value) => `${value / 1000}K`}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "transparent" }}
            />
            <Bar dataKey="value" radius={[8, 8, 8, 8]} maxBarSize={40}>
              {currentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.value)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartCard;
