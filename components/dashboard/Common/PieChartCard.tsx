// components/dashboard/Common/PieChartCard.tsx
"use client";

import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Sector,
  Tooltip,
  TooltipProps,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

interface PieChartData {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number;
}

interface PieChartCardProps {
  title: string;
  data: PieChartData[];
  centerValue: string;
  description?: string;
}

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
    props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        cornerRadius={8}
      />
    </g>
  );
};

const CustomTooltip = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType> & { payload?: PieChartData[] }) => {
  if (
    active &&
    Array.isArray(payload) &&
    payload.length > 0 &&
    payload[0] !== undefined
  ) {
    return (
      <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm font-semibold text-gray-medium">
          {payload[0].name}
        </p>
        <p className="text-sm text-text-secondary">
          ${Number(payload[0].value).toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

interface CustomLegendProps {
  data: PieChartData[];
}

const CustomLegend: React.FC<CustomLegendProps> = ({ data }) => (
  <div className="flex flex-wrap gap-4 justify-center">
    {data.map((entry, index) => (
      <div key={index} className="flex items-center gap-2">
        <div
          className="w-4 h-4 rounded-[6px] border-border "
          style={{ backgroundColor: entry.color }}
        />
        <span className="text-sm text-gray-medium">{entry.name}</span>
      </div>
    ))}
  </div>
);

const PieChartCard: React.FC<PieChartCardProps> = ({
  title,
  data,
  centerValue,
  description,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="w-full bg-white rounded-[20px] p-2 flex flex-col">
      <h2 className="text-lg md:text-xl font-semibold text-gray-medium mb-6">
        {title}
      </h2>

      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-[160px] h-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={2}
                dataKey="value"
                startAngle={90}
                endAngle={450}
                cornerRadius={8}
                activeShape={
                  activeIndex !== null ? renderActiveShape : undefined
                }
                onMouseEnter={(_, index: number) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-2xl md:text-3xl font-bold text-gray-medium">
              {centerValue}
            </span>
          </div>
        </div>

        <CustomLegend data={data} />

        {description && (
          <p className="text-md text-gray-medium bg-gray-primary text-center mt-3 rounded-lg p-2">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default PieChartCard;
