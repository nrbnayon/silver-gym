// components/dashboard/Analytics/MemberStatsChart.tsx
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";

interface MemberStatsChartProps {
  data: {
    totalMembers: number;
    totalMembersUnit: string;
    totalMembersDescription: string;
    newAdmissions: number;
    newAdmissionsUnit: string;
    newAdmissionsDescription: string;
    activeMembers: number;
    activeMembersUnit: string;
    activeMembersDescription: string;
    admissionChart: Array<{ month: string; value: number }>;
    admissionChartPeriod: string;
    currentAdmissions?: number;
    admissionGrowth?: string;
  };
  title?: string;
}

const monthColors = [
  "#B7B976", // May   → dark
  "#B7B976", // Jun   → dark
  "#E9EABE", // Jul   → light
  "#B7B976", // Aug   → dark
  "#B7B976", // Sep   → dark
  "#E9EABE", // Oct   → light
];

const MemberStatsChart: React.FC<MemberStatsChartProps> = ({
  data,
  title = "Member Analytics",
}) => {
  const currentAdmissions = data.currentAdmissions ?? 8458;
  const admissionGrowth = data.admissionGrowth ?? "↑58%";

  return (
    <div className="w-full bg-white rounded-2xl p-4">
      <h2 className="text-lg md:text-xl font-semibold text-gray-medium">
        {title}
      </h2>

      {/* ==================== DESKTOP LAYOUT ==================== */}
      <div className="hidden lg:grid lg:grid-cols-5 gap-4">
        {/* Column 1: Total Members */}
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold text-gray-medium">Total Members</p>
          <p className="text-sm text-text-secondary mt-1 mb-4">
            {data.totalMembersDescription}
          </p>
          <p className="text-xl md:text-3xl font-semibold text-gray-medium">
            {data.totalMembers}
            <span className="text-sm font-normal text-text-secondary ml-1">
              {data.totalMembersUnit}
            </span>
          </p>
        </div>

        {/* Column 2: New Admission + Short Border */}
        <div className="relative flex flex-col justify-center pl-5">
          {/* 50% height centered vertical line */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px bg-gray-200 h-[50%]" />
          
          <p className="text-sm font-semibold text-gray-medium">New Admission</p>
          <p className="text-sm text-text-secondary mt-1 mb-4">
            {data.newAdmissionsDescription}
          </p>
          <p className="text-xl md:text-3xl font-semibold text-gray-medium">
            {data.newAdmissions}
            <span className="text-sm font-normal text-text-secondary ml-1">
              {data.newAdmissionsUnit}
            </span>
          </p>
        </div>

        {/* Column 3: Active Members + Short Border */}
        <div className="relative flex flex-col justify-center pl-5">
          {/* 50% height centered vertical line */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px bg-gray-200 h-[50%]" />
          
          <p className="text-sm font-semibold text-gray-medium">Active Members</p>
          <p className="text-sm text-text-secondary mt-1 mb-4">
            {data.activeMembersDescription}
          </p>
          <p className="text-xl md:text-3xl font-semibold text-gray-medium">
            {data.activeMembers}
            <span className="text-sm font-normal text-text-secondary ml-1">
              {data.activeMembersUnit}
            </span>
          </p>
        </div>

        {/* Column 4: Admission Chart + Short Border */}
        <div className="relative col-span-2 pl-5">
          {/* 50% height centered vertical line */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px bg-gray-200 h-[50%]" />

          <div className="flex justify-between items-start">
            <div></div>
            <span className="text-xs text-text-secondary">
              {data.admissionChartPeriod}
            </span>
          </div>

          {/* Left: Big Number + Growth | Right: Chart */}
          <div className="grid grid-cols-2 items-start">
            {/* Text Content */}
            <div className="h-full flex flex-col justify-center">
              <div className="text-start space-y-3">
                <h3 className="text-base font-semibold text-gray-medium">
                  Admission Chart
                </h3>
                <p className="text-2xl md:text-4xl font-bold text-gray-medium">
                  {currentAdmissions.toLocaleString()}
                </p>
                <p className="text-sm text-text-secondary">
                  New admissions increased by{" "}
                  <span className="text-green-500 font-semibold">{admissionGrowth}</span>{" "}
                  compared to last month.
                </p>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data.admissionChart}
                  margin={{ top: 10, right: 0, left: -30, bottom: 0 }}
                >
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#878787", fontSize: 11 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#878787", fontSize: 11 }}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    labelStyle={{ color: "#374151", fontWeight: "bold" }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={48}>
                    {data.admissionChart.map((_, idx) => (
                      <Cell key={`cell-${idx}`} fill={monthColors[idx]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== MOBILE & TABLET LAYOUT ==================== */}
      <div className="lg:hidden space-y-8">
        {/* Three Stats */}
        <div className="lg:hidden">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                {
                    label: "Total Members",
                    desc: data.totalMembersDescription,
                    value: data.totalMembers,
                    unit: data.totalMembersUnit,
                },
                {
                    label: "New Admission",
                    desc: data.newAdmissionsDescription,
                    value: data.newAdmissions,
                    unit: data.newAdmissionsUnit,
                },
                {
                    label: "Active Members",
                    desc: data.activeMembersDescription,
                    value: data.activeMembers,
                    unit: data.activeMembersUnit,
                },
                ].map((stat) => (
                <div
                    key={stat.label}
                    className="bg-gray-50 rounded-xl p-5 text-center border border-gray-200"
                >
                    <p className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                    {stat.label}
                    </p>
                    <p className="text-xs text-text-secondary mt-1 line-clamp-2">
                    {stat.desc}
                    </p>
                    <p className="mt-3 text-2xl font-bold text-gray-900">
                    {stat.value}
                    <span className="text-sm font-medium text-gray-500 ml-1">
                        {stat.unit}
                    </span>
                    </p>
                </div>
                ))}
            </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-semibold text-gray-medium">Admission Chart</h3>
            <span className="text-xs text-text-secondary">{data.admissionChartPeriod}</span>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <p className="text-xl md:text-4xl font-bold text-gray-medium">
                {currentAdmissions.toLocaleString()}
              </p>
              <p className="text-sm text-text-secondary mt-2">
                New admissions increased by{" "}
                <span className="text-green-500 font-semibold">{admissionGrowth}</span> compared
                to last month.
              </p>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {data.admissionChart.map((item, index) => (
                <div key={item.month} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: monthColors[index] }}
                  />
                  <span className="text-xs text-text-secondary">{item.month}</span>
                </div>
              ))}
            </div>

            {/* Mobile Chart */}
            <div className="h-64 -mx-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data.admissionChart}
                  margin={{ top: 20, right: 20, left: 10, bottom: 10 }}
                >
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#878787", fontSize: 13 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#878787", fontSize: 12 }}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="value" radius={[10, 10, 0, 0]} maxBarSize={60}>
                    {data.admissionChart.map((_, idx) => (
                      <Cell key={`cell-${idx}`} fill={monthColors[idx]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberStatsChart;