// components\dashboard\Common\StatsCard.tsx (already completed)
"use client";

import React from "react";

interface StatsCardProps {
  title: string;
  date?: string;
  stats: {
    label: string;
    description: string;
    value: string | number;
    unit?: string;
  }[];
}

const StatsCard: React.FC<StatsCardProps> = ({ title, date, stats }) => {
  return (
    <div className="w-full bg-white rounded-[20px] p-6 md:p-8 flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-medium">
          {title}
        </h2>
        {date && (
          <div className="px-3 py-1 bg-gray-primary text-gray-medium text-sm rounded-sm">
            {date}
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="flex flex-col md:flex-row justify-between divide-y md:divide-y-0 md:divide-x divide-gray-200">
        {stats.map((item, index) => (
          <div
            key={index}
            className="flex-1 flex flex-col items-start md:items-center py-4 md:py-0 px-0 md:px-6 text-left md:text-center"
          >
            <p className="font-semibold text-gray-medium text-base md:text-lg">
              {item.label}
            </p>
            <p className="text-sm text-text-secondary mb-2">{item.description}</p>
            <p className="text-2xl md:text-3xl font-semibold text-gray-medium">
              {item.value}
              {item.unit && (
                <span className="text-sm font-normal text-text-secondary ml-1">
                  {item.unit}
                </span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCard;
