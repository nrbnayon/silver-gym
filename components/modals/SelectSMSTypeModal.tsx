// components/modals/SelectSMSTypeModal.tsx
"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { smsTemplates } from "@/data/memberData";
import { SMSDeliveryMethod } from "@/types/member";
import { HugeiconsIcon } from "@hugeicons/react";
import { MailSend01Icon, Calendar03Icon } from "@hugeicons/core-free-icons";

interface SelectSMSTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberName: string;
}

type ModalView = "delivery" | "sms-type";

const SelectSMSTypeModal: React.FC<SelectSMSTypeModalProps> = ({
  isOpen,
  onClose,
  memberName,
}) => {
  const [currentView, setCurrentView] = useState<ModalView>("delivery");
  const [deliveryMethod, setDeliveryMethod] =
    useState<SMSDeliveryMethod>("email");
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const [showSchedule, setShowSchedule] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number>(9);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleClose = () => {
    setCurrentView("delivery");
    setDeliveryMethod("email");
    setSelectedTemplates([]);
    setShowSchedule(false);
    setSelectedDate(9);
    setSelectedTime(null);
    onClose();
  };

  const handleNextStep = () => {
    setCurrentView("sms-type");
  };

  const handleToggleTemplate = (templateId: string) => {
    setSelectedTemplates((prev) =>
      prev.includes(templateId)
        ? prev.filter((id) => id !== templateId)
        : [...prev, templateId]
    );
  };

  const handleScheduleClick = () => {
    setShowSchedule(!showSchedule);
  };

  const handleSendNow = () => {
    console.log("Sending SMS to:", memberName);
    console.log("Delivery method:", deliveryMethod);
    console.log("Templates:", selectedTemplates);
    handleClose();
  };

  const handleScheduleSend = () => {
    console.log("Scheduling SMS to:", memberName);
    console.log("Date:", selectedDate);
    console.log("Time:", selectedTime);
    handleClose();
  };

  // Generate calendar days for January 2024
  const getDaysInMonth = () => {
    const days = [];
    const daysInJan = 31;
    for (let i = 1; i <= daysInJan; i++) {
      days.push(i);
    }
    return days;
  };

  const timeSlots = [
    "10:00 AM",
    "12:00 AM",
    "02:00 PM",
    "04:00 PM",
    "08:00 PM",
    "10:00 PM",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogOverlay className="bg-white/30 backdrop-blur-sm" />
      <DialogContent className="w-[95vw] md:max-w-md max-h-[90vh] overflow-hidden flex flex-col p-0">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <DialogTitle className="text-lg sm:text-xl font-semibold text-gray-medium">
            Select SMS Type
          </DialogTitle>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {currentView === "delivery" ? (
            <div className="space-y-6">
              {/* Icon */}
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-xl border-2 border-gray-300 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Choose How to Send
                </h3>
                <p className="text-sm text-gray-500">
                  Select whether you want to send by SMS, WhatsApp, Email, or
                  both
                </p>
              </div>

              {/* Delivery Options */}
              <div className="space-y-3">
                {/* Send E-mail */}
                <div
                  onClick={() => setDeliveryMethod("email")}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    deliveryMethod === "email"
                      ? "border-primary bg-primary/5"
                      : "border-gray-300 hover:border-primary"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          deliveryMethod === "email"
                            ? "border-primary bg-primary"
                            : "border-gray-300"
                        }`}
                      >
                        {deliveryMethod === "email" && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">
                        Send E-mail
                      </h4>
                      <p className="text-sm text-gray-500">
                        Deliver announcements, reminders, and updates directly
                        to members' inbox.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Send Phone */}
                <div
                  onClick={() => setDeliveryMethod("phone")}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    deliveryMethod === "phone"
                      ? "border-primary bg-primary/5"
                      : "border-gray-300 hover:border-primary"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          deliveryMethod === "phone"
                            ? "border-primary bg-primary"
                            : "border-gray-300"
                        }`}
                      >
                        {deliveryMethod === "phone" && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">
                        Send Phone
                      </h4>
                      <p className="text-sm text-gray-500">
                        Deliver announcements, reminders, and updates directly
                        to members' inbox.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Send E-mail & Phone */}
                <div
                  onClick={() => setDeliveryMethod("both")}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    deliveryMethod === "both"
                      ? "border-primary bg-primary/5"
                      : "border-gray-300 hover:border-primary"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          deliveryMethod === "both"
                            ? "border-primary bg-primary"
                            : "border-gray-300"
                        }`}
                      >
                        {deliveryMethod === "both" && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">
                        Send E-mail & Phone
                      </h4>
                      <p className="text-sm text-gray-500">
                        Deliver announcements, reminders, and updates directly
                        to members' inbox.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* SMS Templates */}
              <div className="space-y-3">
                {smsTemplates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => handleToggleTemplate(template.id)}
                    className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-1">
                          {template.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {template.message}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                            selectedTemplates.includes(template.id)
                              ? "bg-primary border-primary"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedTemplates.includes(template.id) && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 12 12"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 3L4.5 8.5L2 6"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Write Single SMS */}
              <button className="w-full border border-gray-200 rounded-lg p-4 flex items-center justify-center gap-2 hover:border-primary transition-colors">
                <HugeiconsIcon icon={MailSend01Icon} size={20} />
                <span className="font-medium text-gray-800">
                  Write Single SMS
                </span>
              </button>

              {/* Schedule Section */}
              {showSchedule && (
                <div className="border border-gray-200 rounded-lg p-4 space-y-4">
                  {/* Year & Month Selector */}
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-800">2024</h4>
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <svg
                          className="w-4 h-4 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <svg
                          className="w-4 h-4 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <h5 className="font-medium text-gray-700">January 2024</h5>
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <svg
                          className="w-4 h-4 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <svg
                          className="w-4 h-4 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Calendar */}
                  <div>
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map(
                        (day) => (
                          <div
                            key={day}
                            className="text-center text-xs font-medium text-gray-500 py-1"
                          >
                            {day}
                          </div>
                        )
                      )}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {/* Empty cells for days before month starts */}
                      <div className="text-center py-2 text-sm text-gray-300">
                        29
                      </div>
                      <div className="text-center py-2 text-sm text-gray-300">
                        30
                      </div>
                      {/* Actual month days */}
                      {getDaysInMonth().map((day) => (
                        <button
                          key={day}
                          onClick={() => setSelectedDate(day)}
                          className={`text-center py-2 text-sm rounded transition-colors ${
                            selectedDate === day
                              ? "bg-primary text-white font-semibold"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 px-3 text-sm rounded border transition-colors ${
                            selectedTime === time
                              ? "bg-primary text-white border-primary"
                              : "border-gray-300 text-gray-700 hover:border-primary"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
          {currentView === "delivery" ? (
            <>
              <button
                onClick={handleClose}
                className="px-6 py-2 text-sm text-gray-medium border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleNextStep}
                className="px-6 py-2 text-sm bg-purple text-white rounded-md hover:bg-[#6A3FE0] transition-colors flex items-center gap-2"
              >
                Next Step
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleClose}
                className="px-4 py-2 text-sm text-gray-medium border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleScheduleClick}
                className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <HugeiconsIcon icon={Calendar03Icon} size={16} />
                Schedule
              </button>
              <button
                onClick={
                  showSchedule && selectedTime
                    ? handleScheduleSend
                    : handleSendNow
                }
                disabled={selectedTemplates.length === 0}
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                  selectedTemplates.length === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-purple text-white hover:bg-[#6A3FE0]"
                }`}
              >
                Send Now
              </button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectSMSTypeModal;
