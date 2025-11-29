// components/dashboard/Analytics/MemberAnalytics.tsx
"use client";

import MemberStatsChart from "@/components/dashboard/Analytics/MemberStatsChart";
import { memberAnalyticsData } from "@/data/analyticsData";

const MemberAnalytics = () => {
  const data = memberAnalyticsData;

  return (
    <div className="md:space-y-6">
      {/* Single Card with Stats and Chart */}
      <MemberStatsChart data={data} title="Member Analytics" />
    </div>
  );
};

export default MemberAnalytics;