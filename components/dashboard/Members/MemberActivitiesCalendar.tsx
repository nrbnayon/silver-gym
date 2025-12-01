// components/dashboard/Members/MemberActivitiesCalendar.tsx
"use client";

import { useState } from "react";

const MemberActivitiesCalendar = () => {
  const [selectedYear, setSelectedYear] = useState("2020");
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [showDate, setShowDate] = useState(true);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);

  const years = ["2020", "2021", "2022", "2023", "2024"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const fullMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Generate calendar days for the selected month
  const getDaysInMonth = () => {
    const daysInMonth = new Date(
      parseInt(selectedYear),
      fullMonths.indexOf(selectedMonth) + 1,
      0
    ).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);
    setShowMonthDropdown(false);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">
        Member Activities
      </h2>

      {/* Year Selector */}
      <div className="relative">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple bg-white"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Month Buttons */}
      <div className="grid grid-cols-4 gap-2">
        {months.map((month, index) => (
          <button
            key={month}
            onClick={() => setSelectedMonth(fullMonths[index])}
            className={`px-3 py-2 text-sm rounded-md transition-colors ${
              fullMonths[index] === selectedMonth
                ? "bg-purple text-white"
                : month === "Oct"
                ? "bg-red-50 text-red-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {month}
          </button>
        ))}
      </div>

      {/* Show Date Toggle */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-700">Show Date</span>
        <button
          onClick={() => setShowDate(!showDate)}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            showDate ? "bg-purple" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
              showDate ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* Month Dropdown */}
      {showDate && (
        <div className="relative">
          <button
            onClick={() => setShowMonthDropdown(!showMonthDropdown)}
            className="w-full px-4 py-2 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-50 transition-colors flex items-center justify-between"
          >
            <span>{selectedMonth}</span>
            <svg
              className={`w-4 h-4 transition-transform ${
                showMonthDropdown ? "rotate-180" : ""
              }`}
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

          {showMonthDropdown && (
            <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {fullMonths.map((month) => (
                <button
                  key={month}
                  onClick={() => handleMonthSelect(month)}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                    month === selectedMonth
                      ? "bg-purple/10 text-purple font-medium"
                      : "text-gray-700"
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Calendar Grid */}
      {showDate && (
        <div className="space-y-2">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <div
                key={index}
                className="text-center text-xs font-medium text-gray-500 py-1"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for days before month starts */}
            {Array.from({
              length: new Date(
                parseInt(selectedYear),
                fullMonths.indexOf(selectedMonth),
                1
              ).getDay(),
            }).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square" />
            ))}

            {/* Actual month days */}
            {getDaysInMonth().map((day) => (
              <button
                key={day}
                className={`aspect-square flex items-center justify-center text-sm rounded-md transition-colors ${
                  day === 17
                    ? "bg-orange-500 text-white font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberActivitiesCalendar;
