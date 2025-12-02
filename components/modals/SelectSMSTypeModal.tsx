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
import { Calendar } from "@/components/ui/calendar";
import { smsTemplates } from "@/data/memberData";
import { SMSDeliveryMethod } from "@/types/member";
import { HugeiconsIcon } from "@hugeicons/react";
import { MailSend01Icon, Calendar03Icon, CheckmarkSquare02Icon, ArrowRight04Icon } from "@hugeicons/core-free-icons";
import { toast } from "sonner";
import SMSSuccessModal from "./SMSSuccessModal";
import { Mail } from "lucide-react";

interface SelectSMSTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberName: string;
}

type ModalView = "delivery" | "sms-type" | "write-sms";

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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [smsTitle, setSmsTitle] = useState<string>("");
  const [smsDescription, setSmsDescription] = useState<string>("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleClose = () => {
    setCurrentView("delivery");
    setDeliveryMethod("email");
    setSelectedTemplates([]);
    setShowSchedule(false);
    setSelectedDate(undefined);
    setSelectedTime(null);
    setSmsTitle("");
    setSmsDescription("");
    setShowSuccessModal(false);
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
    try {
      console.log("Sending SMS to:", memberName);
      console.log("Delivery method:", deliveryMethod);
      console.log("Templates:", selectedTemplates);
      console.log("Title:", smsTitle);
      console.log("Description:", smsDescription);
      
      // Show success modal
      setShowSuccessModal(true);
      
      // Show success toast
      toast.success("SMS sent successfully!", {
        description: `Your message has been delivered to ${memberName}`,
      });
      
      // Close the main modal after a short delay
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      console.error("Error sending SMS:", error);
      toast.error("Failed to send SMS", {
        description: "Please try again later",
      });
    }
  };

  const handleScheduleSend = () => {
    try {
      if (!selectedDate || !selectedTime) {
        toast.error("Please select both date and time");
        return;
      }

      console.log("Scheduling SMS to:", memberName);
      console.log("Date:", selectedDate);
      console.log("Time:", selectedTime);
      console.log("Delivery method:", deliveryMethod);
      console.log("Templates:", selectedTemplates);
      
      const formattedDate = selectedDate.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric',
        year: 'numeric'
      });
      
      // Show success toast for scheduled message
      toast.success("SMS scheduled successfully!", {
        description: `Your message will be sent on ${formattedDate} at ${selectedTime}`,
      });
      
      // Close the modal
      handleClose();
    } catch (error) {
      console.error("Error scheduling SMS:", error);
      toast.error("Failed to schedule SMS", {
        description: "Please try again later",
      });
    }
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
      <DialogContent className="w-[95vw] md:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col p-0 border-8 border-gray-secondary">
        {/* Header */}
        <DialogHeader className="px-6 py-3 shrink-0">
          <DialogTitle className="text-lg sm:text-xl font-semibold text-gray-medium">
            Select SMS Type
          </DialogTitle>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-3">
          {currentView === "delivery" ? (
            // Delivery selection view
            <div className="space-y-3">
              {/* Icon */}
              <div className="flex justify-center">
                  <HugeiconsIcon icon={CheckmarkSquare02Icon} className="w-16 h-16" strokeWidth={1} />
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
                    <div className="shrink-0 mt-0.5">
                      <div
                        className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center ${
                          deliveryMethod === "email"
                            ? "border-none"
                            : "border-gray-300"
                        }`}
                      >
                        {deliveryMethod === "email" && (
                          <HugeiconsIcon icon={CheckmarkSquare02Icon} className="w-6 h-6 text-primary" strokeWidth={2} />
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
                    <div className="shrink-0 mt-0.5">
                      <div
                        className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center ${
                          deliveryMethod === "phone"
                            ? "border-none"
                            : "border-gray-300"
                        }`}
                      >
                        {deliveryMethod === "phone" && (
                          <HugeiconsIcon icon={CheckmarkSquare02Icon} className="w-6 h-6 text-primary" strokeWidth={2} />
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
                    <div className="shrink-0 mt-0.5">
                      <div
                        className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center ${
                          deliveryMethod === "both"
                            ? "border-none"
                            : "border-gray-300"
                        }`}
                      >
                        {deliveryMethod === "both" && (
                          <HugeiconsIcon icon={CheckmarkSquare02Icon} className="w-6 h-6 text-primary" strokeWidth={2} />
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
          ) : currentView === "sms-type" ? (
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
                      <div className="shrink-0">
                        <div
                          className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center transition-all ${
                            selectedTemplates.includes(template.id)
                              ? "border-none"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedTemplates.includes(template.id) && (
                            <HugeiconsIcon icon={CheckmarkSquare02Icon} className="w-6 h-6 text-primary" strokeWidth={2} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Write Single SMS */}
              <button
                onClick={() => setCurrentView("write-sms")}
                className="w-full rounded-lg p-4 flex items-center justify-center gap-2 hover:border-primary transition-colors cursor-pointer bg-gray-secondary hover:bg-gray-primary"
              >
                <span className="font-medium text-gray-medium">
                  Write Single SMS
                </span>
                <HugeiconsIcon icon={MailSend01Icon} size={20} />
              </button>

              {/* Schedule Section */}
              {showSchedule && (
                  <div className="space-y-4">
                    
                  {/* Time Slots */}
                  <div>
                    <h5 className="font-medium text-gray-700 mb-3">Select Time</h5>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 px-3 text-sm rounded border transition-colors ${
                            selectedTime === time
                              ? "bg-white text-primary border border-primary"
                              : "border-gray-300 text-gray-700 hover:border-primary"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Calendar */}
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      captionLayout="dropdown"
                      startMonth={new Date(2025, 0)}
                      endMonth={new Date(2100, 11)}
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      className="rounded-xl border w-full [--cell-size:theme(spacing.9)]"
                    />
                  </div>
                </div>
              )}
            </div>
          ) : currentView === "write-sms" ? (
            <div className="space-y-4">
              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SMS Title
                </label>
                <input
                  type="text"
                  placeholder="Type your sms title"
                  value={smsTitle}
                  onChange={(e) => setSmsTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SMS Description
                </label>
                <textarea
                  placeholder="Write your sms as a description..."
                  value={smsDescription}
                  onChange={(e) => setSmsDescription(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
              </div>

              {/* Character Count */}
              <div className="text-xs text-gray-500 text-right">
                {smsDescription.length} characters
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="shrink-0 flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
          {currentView === "delivery" ? (
            <>
              <button
                onClick={handleClose}
                className="px-6 py-2 text-sm text-gray-medium border border-gray-300 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleNextStep}
                className="px-6 py-2 text-sm bg-purple text-white rounded-md hover:bg-[#6A3FE0] transition-colors flex items-center gap-2 cursor-pointer"
              >
                Next Step
                <HugeiconsIcon icon={ArrowRight04Icon} />
              </button>
            </>
          ) : currentView === "sms-type" ? (
            <>
              <button
                onClick={handleClose}
                className="px-4 py-2 text-sm text-gray-medium border border-gray-300 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleScheduleClick}
                className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-1 bg-primary text-white hover:bg-primary/90 cursor-pointer"
              >
                Schedule
                <HugeiconsIcon icon={Calendar03Icon} size={20} />
              </button>
              <button
                onClick={
                  showSchedule && selectedTime && selectedDate
                    ? handleScheduleSend
                    : handleSendNow
                }
                disabled={selectedTemplates.length === 0}
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                  selectedTemplates.length === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-purple text-white hover:bg-[#6A3FE0] cursor-pointer"
                }`}
              >
                Send Now
              </button>
            </>
          ) : currentView === "write-sms" ? (
            <>
              <button
                onClick={() => setCurrentView("sms-type")}
                className="px-4 py-2 text-sm text-gray-medium border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSendNow}
                disabled={!smsTitle.trim() || !smsDescription.trim()}
                className={`px-6 py-2 text-sm rounded-md transition-colors flex items-center gap-2 ${
                  !smsTitle.trim() || !smsDescription.trim()
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
              >
                <Mail className="w-4 h-4" />
                Send Now
              </button>
              <button
                onClick={handleSendNow}
                disabled={!smsTitle.trim() || !smsDescription.trim()}
                className={`px-6 py-2 text-sm rounded-md transition-colors ${
                  !smsTitle.trim() || !smsDescription.trim()
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-purple text-white hover:bg-[#6A3FE0]"
                }`}
              >
                Send Now
              </button>
            </>
          ) : null}
        </div>
      </DialogContent>

      {/* Success Modal */}
      <SMSSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        memberName={memberName}
      />
    </Dialog>
  );
};

export default SelectSMSTypeModal;