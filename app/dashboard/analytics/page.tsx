// app/dashboard/analytics/page.tsx
"use client";
import { useState } from "react";
import MemberAnalytics from "@/components/dashboard/Analytics/MemberAnalytics";
import FinancialAnalytics from "@/components/dashboard/Analytics/FinancialAnalytics";
import CostAnalytics from "@/components/dashboard/Analytics/CostAnalytics";
import PackagesAnalytics from "@/components/dashboard/Analytics/PackagesAnalytics";
import CompareAnalyticsModal from "@/components/dashboard/Analytics/CompareAnalyticsModal";
import FinancialsCompare from "@/components/dashboard/Analytics/FinancialsCompare";
import { HugeiconsIcon } from "@hugeicons/react";
import { AnalyticsDownIcon } from "@hugeicons/core-free-icons";

export default function AnalyticsPage() {
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showCompareView, setShowCompareView] = useState(false);

  const handleStartCompare = (
    options: string[],
    startYear: number,
    endYear: number
  ) => {
    console.log("Compare options:", options, startYear, endYear);
    setShowCompareView(true);
  };

  const handleNewCompare = () => {
    setShowCompareModal(true);
  };

  return (
    <div className="min-h-screen">
      <div className="w-full space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-text-primary">Analytics</h1>
          {!showCompareView && (
            <button
              onClick={() => setShowCompareModal(true)}
              className="px-4 py-2.5 bg-purple text-white text-sm rounded-md hover:bg-[#6A3FE0] transition-colors flex items-center gap-2 cursor-pointer"
            >
             <HugeiconsIcon icon={AnalyticsDownIcon} />
              Compare Analytics
            </button>
          )}
        </div>

        {/* Main Content */}
        {showCompareView ? (
          <FinancialsCompare onNewCompare={handleNewCompare} />
        ) : (
          <>
            {/* Member Analytics */}
            <MemberAnalytics />

            {/* Financial Analytics */}
            <FinancialAnalytics />

            {/* Cost Analytics */}
            <CostAnalytics />

            {/* Packages Analytics */}
            <PackagesAnalytics />
          </>
        )}

        {/* Compare Analytics Modal */}
        <CompareAnalyticsModal
          isOpen={showCompareModal}
          onClose={() => setShowCompareModal(false)}
          onStartCompare={handleStartCompare}
        />
      </div>
    </div>
  );
}
