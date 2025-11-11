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
        <p className="text-sm font-semibold text-[#505050]">
          {payload[0].name}
        </p>
        <p className="text-sm text-[#878787]">
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
          className="w-4 h-4 rounded-[6px] border-3 border-[#F9F9F9] "
          style={{ backgroundColor: entry.color }}
        />
        <span className="text-sm text-[#505050]">{entry.name}</span>
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
      <h2 className="text-lg md:text-xl font-semibold text-[#505050] mb-6">
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
            <span className="text-2xl md:text-3xl font-bold text-[#505050]">
              {centerValue}
            </span>
          </div>
        </div>

        <CustomLegend data={data} />

        {description && (
          <p className="text-md text-[#505050] bg-[#F9F9F9] text-center mt-3 rounded-lg p-2">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default PieChartCard;
