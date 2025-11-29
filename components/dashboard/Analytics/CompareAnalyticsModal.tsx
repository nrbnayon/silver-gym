"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogOverlay, DialogTitle } from "@/components/ui/dialog";
import { comparisonOptions, availableYears } from "@/data/analyticsData";
import { ImageIcon } from "@/components/utils/ImageIcon";
import { HugeiconsIcon } from "@hugeicons/react";
import { AnalyticsUpIcon, MoneyReceiveSquareIcon, MoneySendSquareIcon } from "@hugeicons/core-free-icons";

interface CompareAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartCompare: (options: string[], startYear: number, endYear: number) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  users: <ImageIcon activeImage='/icons/users.svg' size={32} />,
  "user-add": <ImageIcon activeImage='/icons/users.svg' size={32} />,
  "money-receive": <HugeiconsIcon icon={MoneyReceiveSquareIcon} size={32} className="text-gray-medium" strokeWidth={1} />,
  "money-send": <HugeiconsIcon icon={MoneySendSquareIcon} size={32} className="text-gray-medium" strokeWidth={1} />,
  chart: <HugeiconsIcon icon={AnalyticsUpIcon} size={32} className="text-gray-medium" strokeWidth={1} />,
};

const CompareAnalyticsModal: React.FC<CompareAnalyticsModalProps> = ({
  isOpen,
  onClose,
  onStartCompare,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [startYear, setStartYear] = useState<string>("");
  const [endYear, setEndYear] = useState<string>("");
  const [isStartYearOpen, setIsStartYearOpen] = useState(false);
  const [isEndYearOpen, setIsEndYearOpen] = useState(false);

  const handleToggleOption = (optionId: string) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleStartCompare = () => {
    if (selectedOptions.length > 0 && startYear && endYear) {
      onStartCompare(selectedOptions, Number(startYear), Number(endYear));
      onClose();
      // Reset selections
      setSelectedOptions([]);
      setStartYear("");
      setEndYear("");
    }
  };

  const handleClose = () => {
    // Reset selections on close
    setSelectedOptions([]);
    setStartYear("");
    setEndYear("");
    onClose();
  };

  // Filter years for end year dropdown (should be >= start year)
  const availableEndYears = startYear 
    ? availableYears.filter(year => year >= Number(startYear))
    : availableYears;

  // Validate if end year is less than start year
  const isYearRangeValid = !startYear || !endYear || Number(endYear) >= Number(startYear);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogOverlay className="bg-white/30 backdrop-blur-sm" />
      <DialogContent className="w-[95vw] w-full md:min-w-3xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        {/* Header - Fixed */}
        <DialogHeader className="px-4 sm:px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <DialogTitle className="text-lg sm:text-xl font-semibold text-gray-medium">
            Compare Analytics
          </DialogTitle>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
          <div className="space-y-6">
            {/* Select Compare Options */}
            <div>
              <p className="text-sm text-gray-medium mb-4">
                Select your compare option
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {comparisonOptions.map((option) => {
                  const isSelected = selectedOptions.includes(option.id);
                  return (
                    <div
                      key={option.id}
                      onClick={() => handleToggleOption(option.id)}
                      className={`relative border rounded-lg p-3 sm:p-4 cursor-pointer transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border-2 hover:border-primary"
                      }`}
                    >
                      {/* Icon */}
                      <div className="mb-2 sm:mb-3">{iconMap[option.icon]}</div>

                      {/* Content */}
                      <div className="mb-2 sm:mb-3 pr-6">
                        <p className="font-semibold text-gray-medium text-sm mb-1">
                          {option.label}
                        </p>
                        <p className="text-xs text-gray-medium leading-relaxed">
                          {option.description}
                        </p>
                      </div>

                      {/* Checkbox */}
                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                        <div
                          className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center transition-all ${
                            isSelected
                              ? "bg-primary border-primary border border-primary/50"
                              : "bg-white border border-border-2"
                          }`}
                        >
                          {isSelected && (
                            <svg
                              className="w-3 h-3 text-white"
                              viewBox="0 0 12 12"
                              fill="none"
                            >
                              <path
                                d="M10 3L4.5 8.5L2 6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Select Year Duration */}
            <div>
              <p className="text-sm text-gray-medium mb-4">
                Select your year duration
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                {/* Start Year */}
                <div>
                  <label className="block text-sm font-medium text-gray-medium mb-2">
                    Start Year
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        setIsStartYearOpen(!isStartYearOpen);
                        setIsEndYearOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left border border-gray-300 rounded-md text-gray-medium bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-sm"
                    >
                      {startYear || "Select year"}
                      <svg
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {isStartYearOpen && (
                      <div className="absolute z-[999] w-full bottom-full mb-2 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                        {availableYears.map((year) => (
                          <button
                            key={year}
                            type="button"
                            onClick={() => {
                              setStartYear(year.toString());
                              // Reset end year if it's less than new start year
                              if (endYear && Number(endYear) < year) {
                                setEndYear("");
                              }
                              setIsStartYearOpen(false);
                            }}
                            className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-sm ${
                              startYear === year.toString()
                                ? "bg-primary/10 text-primary font-medium"
                                : "text-gray-medium"
                            }`}
                          >
                            {year}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* End Year */}
                <div>
                  <label className="block text-sm font-medium text-gray-medium mb-2">
                    End Year
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEndYearOpen(!isEndYearOpen);
                        setIsStartYearOpen(false);
                      }}
                      disabled={!startYear}
                      className={`w-full px-4 py-2 text-left border border-gray-300 rounded-md bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-sm ${
                        !startYear ? "opacity-50 cursor-not-allowed" : "text-gray-medium"
                      }`}
                    >
                      {endYear || "Select year"}
                      <svg
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {isEndYearOpen && startYear && (
                      <div className="absolute z-10 w-full bottom-full mb-2 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                        {availableEndYears.map((year) => (
                          <button
                            key={year}
                            type="button"
                            onClick={() => {
                              setEndYear(year.toString());
                              setIsEndYearOpen(false);
                            }}
                            className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-sm ${
                              endYear === year.toString()
                                ? "bg-primary/10 text-primary font-medium"
                                : "text-gray-medium"
                            }`}
                          >
                            {year}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="flex-shrink-0 flex justify-end gap-3 px-4 sm:px-6 py-4 border-t border-gray-200">
          <button
            onClick={handleClose}
            className="px-4 sm:px-6 py-2 text-sm sm:text-base text-gray-medium border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleStartCompare}
            disabled={selectedOptions.length === 0 || !startYear || !endYear || !isYearRangeValid}
            className={`px-4 sm:px-6 py-2 text-sm sm:text-base rounded-md transition-colors ${
              selectedOptions.length === 0 || !startYear || !endYear || !isYearRangeValid
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-purple text-white hover:bg-[#6A3FE0]"
            }`}
          >
            Start Compare
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompareAnalyticsModal;