// components/dashboard/Common/LineChartCard.tsx
"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  TooltipProps,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

interface LineChartData {
  period: string;
  income: number;
  expense: number;
}

interface LineChartCardProps {
  title: string;
  data: LineChartData[];
  percentage?: string;
  description?: string;
  incomeColor?: string;
  expenseColor?: string;
}

const CustomTooltip = (props: TooltipProps<ValueType, NameType>) => {
  const { active, payload } = props as {
    active?: boolean;
    payload?: {
      payload?: LineChartData;
      value?: number;
      name?: string;
      color?: string;
    }[];
  };

  if (active && Array.isArray(payload) && payload.length) {
    return (
      <div className="bg-white px-4 py-3 rounded-lg shadow-lg border border-gray-200">
        <p className="text-xs text-[#878787] mb-2">
          {payload && payload[0] && payload[0].payload
            ? payload[0].payload.period
            : ""}
        </p>
        {payload &&
          payload.map &&
          payload.map((entry, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 mb-1"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-[#505050] capitalize">
                  {entry.name}
                </span>
              </div>
              <span className="text-sm font-semibold text-[#505050]">
                ${Number(entry.value).toLocaleString()}
              </span>
            </div>
          ))}
      </div>
    );
  }
  return null;
};

interface CustomLegendProps {
  incomeColor: string;
  expenseColor: string;
}

const CustomLegend: React.FC<CustomLegendProps> = ({
  incomeColor,
  expenseColor,
}) => (
  <div className="flex flex-wrap gap-1 justify-end mb-4">
    <div className="flex items-center">
      <div
        className="w-4 h-4 rounded-[6px] border-3 border-[#F9F9F9] "
        style={{ backgroundColor: incomeColor }}
      />
      <span className="text-sm text-[#F9F9F9]">|</span>
    </div>
    <div className="flex items-center">
      <div
        className="w-4 h-4 rounded-[6px] border-3 border-[#F9F9F9] "
        style={{ backgroundColor: expenseColor }}
      />
    </div>
  </div>
);

const LineChartCard: React.FC<LineChartCardProps> = ({
  title,
  data,
  percentage,
  description,
  incomeColor = "#AA81FE",
  expenseColor = "#EEF674",
}) => {
  return (
    <div className="w-full bg-white rounded-[20px] p-3 flex flex-col border-4 border-[#F9F9F9] ">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-[#505050] mb-3">{title}</h2>
        <CustomLegend incomeColor={incomeColor} expenseColor={expenseColor} />
      </div>

      {/* <div className="mb-4">
        {percentage && (
          <div className="flex items-baseline gap-2 mb-2 flex-wrap">
            <span className="text-sm text-[#878787]">
              Your expenses are only
            </span>
            <span className="text-2xl font-bold text-[#505050]">
              {percentage}
            </span>
            <span className="text-sm text-[#878787]">of your income</span>
          </div>
        )}
        {description && <p className="text-sm text-[#878787]">{description}</p>}
      </div> */}

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
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
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#878787", fontSize: 12 }}
              tickFormatter={(value) => `${value / 1000}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="income"
              stroke={incomeColor}
              strokeWidth={3}
              dot={{ fill: incomeColor, r: 4 }}
              activeDot={{ r: 6 }}
              name="income"
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke={expenseColor}
              strokeWidth={3}
              dot={{ fill: expenseColor, r: 4 }}
              activeDot={{ r: 6 }}
              name="expense"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartCard;
