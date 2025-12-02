// components/dashboard/Income/SummaryViewToggle.tsx
"use client";

import { Switch } from "@/components/ui/switch";

interface SummaryViewToggleProps {
  showSummaryOnly: boolean;
  setShowSummaryOnly: (value: boolean) => void;
}

export default function SummaryViewToggle({
  showSummaryOnly,
  setShowSummaryOnly,
}: SummaryViewToggleProps) {
  return (
    <div className="flex items-center gap-3">
      <Switch
        checked={showSummaryOnly}
        onCheckedChange={setShowSummaryOnly}
        className="data-[state=checked]:bg-purple"
      />
      <label className="text-sm font-medium text-gray-700 cursor-pointer">
        Show Summary Only
      </label>
    </div>
  );
}
