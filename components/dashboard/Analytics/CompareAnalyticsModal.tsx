// components/dashboard/Analytics/CompareAnalyticsModal.tsx
"use client";

import React, { useState } from "react";
import { Users, UserPlus, TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogOverlay, DialogTitle } from "@/components/ui/dialog";
import { comparisonOptions } from "@/data/analyticsData";

interface CompareAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartCompare: (options: string[], startYear: number, endYear: number) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  users: <Users className="w-8 h-8 text-gray-medium" />,
  "user-add": <UserPlus className="w-8 h-8 text-gray-medium" />,
  "money-receive": <TrendingUp className="w-8 h-8 text-gray-medium" />,
  "money-send": <TrendingDown className="w-8 h-8 text-gray-medium" />,
  chart: <BarChart3 className="w-8 h-8 text-gray-medium" />,
};

const CompareAnalyticsModal: React.FC<CompareAnalyticsModalProps> = ({
  isOpen,
  onClose,
  onStartCompare,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [startYear, setStartYear] = useState<number>(2020);
  const [endYear, setEndYear] = useState<number>(2024);

  const years = [2020, 2021, 2022, 2023, 2024];

  const handleToggleOption = (optionId: string) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleStartCompare = () => {
    onStartCompare(selectedOptions, startYear, endYear);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-white/30 backdrop-blur-sm" />
      <DialogContent className="w-full md:min-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-medium">
            Compare Analytics
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <p className="text-sm text-[#878787] mb-4">
              Select your compare option
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {comparisonOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => handleToggleOption(option.id)}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedOptions.includes(option.id)
                      ? "border-[#7C4DFF] bg-[#7C4DFF]/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selectedOptions.includes(option.id)}
                      onChange={() => handleToggleOption(option.id)}
                      className="mt-1 w-4 h-4 text-[#7C4DFF] rounded border-gray-300 focus:ring-[#7C4DFF]"
                    />
                    <div className="flex-1">
                      <div className="mb-2">{iconMap[option.icon]}</div>
                      <p className="font-semibold text-gray-medium text-sm mb-1">
                        {option.label}
                      </p>
                      <p className="text-xs text-[#878787] leading-relaxed">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-[#878787] mb-4">
              Select your year duration
            </p>

            <div className="grid grid-cols-2 gap-4">
              {/* Start Year */}
              <div>
                <label className="block text-sm font-medium text-gray-medium mb-2">
                  Start Year
                </label>
                <select
                  value={startYear}
                  onChange={(e) => setStartYear(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-medium focus:outline-none focus:ring-2 focus:ring-[#7C4DFF] focus:border-transparent"
                >
                  <option value="">Select year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* End Year */}
              <div>
                <label className="block text-sm font-medium text-gray-medium mb-2">
                  End Year
                </label>
                <select
                  value={endYear}
                  onChange={(e) => setEndYear(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-medium focus:outline-none focus:ring-2 focus:ring-[#7C4DFF] focus:border-transparent"
                >
                  <option value="">Select year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-medium border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleStartCompare}
              className="px-6 py-2 bg-[#7C4DFF] text-white rounded-md hover:bg-[#6A3FE0] transition-colors"
            >
              Start Compare
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompareAnalyticsModal;
