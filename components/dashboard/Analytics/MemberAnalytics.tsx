// components/dashboard/Analytics/MemberAnalytics.tsx
"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";
import { memberAnalyticsData } from "@/data/analyticsData";

const MemberAnalytics = () => {
  const data = memberAnalyticsData;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#505050]">Member Analytics</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Members */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-[#878787] mb-2">Total Members</p>
          <p className="text-[#505050] text-sm mb-3">
            {data.totalMembersDescription}
          </p>
          <p className="text-4xl font-bold text-[#505050]">
            {data.totalMembers}
            <span className="text-sm font-normal text-[#878787] ml-1">
              {data.totalMembersUnit}
            </span>
          </p>
        </div>

        {/* New Admission */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-[#878787] mb-2">New Admission</p>
          <p className="text-[#505050] text-sm mb-3">
            {data.newAdmissionsDescription}
          </p>
          <p className="text-4xl font-bold text-[#505050]">
            {data.newAdmissions}
            <span className="text-sm font-normal text-[#878787] ml-1">
              {data.newAdmissionsUnit}
            </span>
          </p>
        </div>

        {/* Active Members */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-[#878787] mb-2">Active Members</p>
          <p className="text-[#505050] text-sm mb-3">
            {data.activeMembersDescription}
          </p>
          <p className="text-4xl font-bold text-[#505050]">
            {data.activeMembers}
            <span className="text-sm font-normal text-[#878787] ml-1">
              {data.activeMembersUnit}
            </span>
          </p>
        </div>
      </div>

      {/* Admission Chart */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-[#505050]">
            Admission Chart
          </h3>
          <span className="text-sm text-[#878787]">
            {data.admissionChartPeriod}
          </span>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div>
            <p className="text-4xl font-bold text-[#505050]">8,458</p>
            <p className="text-sm text-[#878787] mt-1">
              New admissions increased compared to the last month
            </p>
          </div>
          <div className="flex items-center gap-6 ml-auto">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#4ADE80]"></div>
              <span className="text-xs text-[#878787]">May</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#86EFAC]"></div>
              <span className="text-xs text-[#878787]">Jun</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#BBF7D0]"></div>
              <span className="text-xs text-[#878787]">Jul</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#86EFAC]"></div>
              <span className="text-xs text-[#878787]">Aug</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#4ADE80]"></div>
              <span className="text-xs text-[#878787]">Sep</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#22C55E]"></div>
              <span className="text-xs text-[#878787]">Oct</span>
            </div>
          </div>
        </div>

        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data.admissionChart}
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
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#505050", fontWeight: "bold" }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={60}>
                {data.admissionChart.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      index === 0
                        ? "#4ADE80"
                        : index === 1
                        ? "#86EFAC"
                        : index === 2
                        ? "#BBF7D0"
                        : index === 3
                        ? "#86EFAC"
                        : index === 4
                        ? "#4ADE80"
                        : "#22C55E"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MemberAnalytics;
