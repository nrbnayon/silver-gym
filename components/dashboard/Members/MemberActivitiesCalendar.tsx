// components/dashboard/Members/MemberActivitiesCalendar.tsx
"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { MemberActivity } from "@/types/member";

interface MemberActivitiesCalendarProps {
  memberId?: string;
}

const MemberActivitiesCalendar: React.FC<MemberActivitiesCalendarProps> = ({
  memberId,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [showDate, setShowDate] = useState(true);

  // Sample activity data - in a real app, this would come from an API
  const activities: MemberActivity[] = [
    {
      date: new Date(2025, 11, 3),
      hasActivity: true,
      type: "workout",
      description: "Cardio session completed",
    },
    {
      date: new Date(2025, 11, 7),
      hasActivity: true,
      type: "workout",
      description: "Strength training",
    },
    {
      date: new Date(2025, 11, 12),
      hasActivity: true,
      type: "attendance",
      description: "Gym check-in",
    },
    {
      date: new Date(2025, 11, 17),
      hasActivity: true,
      type: "workout",
      description: "HIIT workout session",
    },
    {
      date: new Date(2025, 11, 22),
      hasActivity: true,
      type: "attendance",
      description: "Gym check-in",
    },
    {
      date: new Date(2025, 11, 28),
      hasActivity: true,
      type: "workout",
      description: "Group class",
    },
  ];

  const getActivityForDate = (date: Date): MemberActivity | undefined => {
    return activities.find(
      (activity) =>
        activity.date.getDate() === date.getDate() &&
        activity.date.getMonth() === date.getMonth() &&
        activity.date.getFullYear() === date.getFullYear()
    );
  };

  // Separate activities by type
  const workoutDates = activities
    .filter((a) => a.hasActivity && a.type === "workout")
    .map((a) => a.date);

  const paymentDates = activities
    .filter((a) => a.hasActivity && a.type === "payment")
    .map((a) => a.date);

  const attendanceDates = activities
    .filter((a) => a.hasActivity && a.type === "attendance")
    .map((a) => a.date);

  const selectedActivity = selectedDate
    ? getActivityForDate(selectedDate)
    : null;

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

  const handleMonthClick = (monthIndex: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), monthIndex));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">
        Member Activities
      </h2>

      {/* Months Grid */}
      <div className="grid grid-cols-4 gap-2">
        {months.map((month, index) => (
          <button
            key={month}
            onClick={() => handleMonthClick(index)}
            className={`px-3 py-2 text-sm rounded-md transition-colors ${
              currentMonth.getMonth() === index
                ? "bg-purple text-white"
                : month === "Oct"
                ? "bg-red-50 text-red-600 hover:bg-red-100"
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

      {/* Calendar with dropdown support */}
      {showDate && (
        <div className="space-y-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            captionLayout="dropdown"
            startMonth={new Date(1950, 0)}
            endMonth={new Date(2100, 11)}
            className="rounded-xl border w-full"
            modifiers={{
              workout: workoutDates,
              payment: paymentDates,
              attendance: attendanceDates,
            }}
            modifiersClassNames={{
              workout: "bg-orange-100 text-orange-600 font-semibold hover:bg-orange-200 rounded-md mx-2",
              payment: "bg-green-100 text-green-600 font-semibold hover:bg-green-200 rounded-md mx-2",
              attendance: "bg-blue-100 text-blue-600 font-semibold hover:bg-blue-200 rounded-md mx-2",
            }}
          />

          {/* Selected Date Activity Info */}
          {selectedActivity && (
            <div className={`p-4 border rounded-lg ${
              selectedActivity.type === "workout"
                ? "bg-orange-50 border-orange-200"
                : selectedActivity.type === "payment"
                ? "bg-green-50 border-green-200"
                : "bg-blue-50 border-blue-200"
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    selectedActivity.type === "workout"
                      ? "bg-orange-500"
                      : selectedActivity.type === "payment"
                      ? "bg-green-500"
                      : "bg-blue-500"
                  }`}
                />
                <span className={`text-sm font-medium capitalize ${
                  selectedActivity.type === "workout"
                    ? "text-orange-800"
                    : selectedActivity.type === "payment"
                    ? "text-green-800"
                    : "text-blue-800"
                }`}>
                  {selectedActivity.type}
                </span>
              </div>
              <p className={`text-sm ${
                selectedActivity.type === "workout"
                  ? "text-orange-700"
                  : selectedActivity.type === "payment"
                  ? "text-green-700"
                  : "text-blue-700"
              }`}>
                {selectedActivity.description}
              </p>
            </div>
          )}

          {/* Legend */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-700">Activity Types:</p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
                <span className="text-xs text-gray-600">Workout</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-xs text-gray-600">Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-xs text-gray-600">Attendance</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberActivitiesCalendar;