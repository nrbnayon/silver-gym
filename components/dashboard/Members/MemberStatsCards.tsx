// components/dashboard/Members/MemberStatsCards.tsx
"use client";

import React from "react";
import { MemberStats } from "@/types/member";
import { HugeiconsIcon } from "@hugeicons/react";
import { Setting07Icon } from "@hugeicons/core-free-icons";

interface MemberStatsCardsProps {
  stats: MemberStats;
  onManageClick?: () => void;
}

const MemberStatsCards: React.FC<MemberStatsCardsProps> = ({
  stats,
  onManageClick,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Members */}
      <div className="bg-white rounded-lg p-4">
        <h3 className="text-sm text-gray-500 mb-2">Total Members</h3>
        <p className="text-gray-600 text-xs mb-3">
          {stats.totalMembersDescription}
        </p>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-semibold text-gray-800">
            {stats.totalMembers.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500">{stats.totalMembersUnit}</span>
        </div>
      </div>

      {/* New Admission */}
      <div className="bg-white rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm text-gray-500">New Admission</h3>
          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
            {stats.newAdmissionBadge}
          </span>
        </div>
        <p className="text-gray-600 text-xs mb-3">
          {stats.newAdmissionDescription}
        </p>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-semibold text-gray-800">
            {stats.newAdmission.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500">{stats.newAdmissionUnit}</span>
        </div>
      </div>

      {/* Active Members */}
      <div className="bg-white rounded-lg p-4">
        <h3 className="text-sm text-gray-500 mb-2">Active Members</h3>
        <p className="text-gray-600 text-xs mb-3">
          {stats.activeMembersDescription}
        </p>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-semibold text-gray-800">
            {stats.activeMembers.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500">
            {stats.activeMembersUnit}
          </span>
        </div>
      </div>

      {/* Manage Member Form */}
      <div className="bg-white rounded-lg p-4">
        <h3 className="text-sm text-gray-500 mb-2">Manage Member Form</h3>
        <p className="text-gray-600 text-xs mb-3">
          Customize the member registration form
        </p>
        <button
          onClick={onManageClick}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 mt-2"
        >
          <HugeiconsIcon icon={Setting07Icon} size={18} />
          Manage
        </button>
      </div>
    </div>
  );
};

export default MemberStatsCards;
