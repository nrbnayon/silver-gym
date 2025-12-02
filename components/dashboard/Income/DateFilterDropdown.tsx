// components/dashboard/Income/DateFilterDropdown.tsx
"use client";

import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { DateFilterType } from "@/types/income";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DateFilterDropdownProps {
  dateFilter: DateFilterType;
  setDateFilter: (filter: DateFilterType) => void;
  customStartDate: string;
  setCustomStartDate: (date: string) => void;
  customEndDate: string;
  setCustomEndDate: (date: string) => void;
}

export default function DateFilterDropdown({
  dateFilter,
  setDateFilter,
  customStartDate,
  setCustomStartDate,
  customEndDate,
  setCustomEndDate,
}: DateFilterDropdownProps) {
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);

  const getDisplayText = () => {
    if (dateFilter === "today") return "Today";
    if (dateFilter === "thisMonth") return "This Month";
    if (dateFilter === "custom" && customStartDate && customEndDate) {
      return `${formatDate(customStartDate)} To ${formatDate(customEndDate)}`;
    }
    return "Today";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleCustomDateClick = () => {
    setShowCustomDatePicker(true);
  };

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 transition-colors min-w-[100px] justify-between h-10 bg-gray-primary! hover:bg-gray-200! cursor-pointer">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>{getDisplayText()}</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuItem
            onClick={() => {
              setDateFilter("today");
              setShowCustomDatePicker(false);
            }}
            className="cursor-pointer"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Today
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setDateFilter("thisMonth");
              setShowCustomDatePicker(false);
            }}
            className="cursor-pointer"
          >
            <Calendar className="w-4 h-4 mr-2" />
            This Month
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleCustomDateClick}
            className="cursor-pointer"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Custom Date
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Custom Date Picker Modal */}
      {showCustomDatePicker && (
        <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-xl w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Select your date duration
            </h3>

            <div className="flex justify-between items-center gap-4">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCustomDatePicker(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (customStartDate && customEndDate) {
                    setDateFilter("custom");
                    setShowCustomDatePicker(false);
                  }
                }}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
