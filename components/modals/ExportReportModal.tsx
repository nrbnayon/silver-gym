// components/modals/ExportReportModal.tsx
"use client";

import { useState } from "react";
import Modal from "../ui/modal";
import { Input } from "../ui/input";
import { FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExportReportModal({
  isOpen,
  onClose,
}: ExportReportModalProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setStartDate("");
    setEndDate("");
    onClose();
  };

  const handleDownload = async () => {
    // Validation
    if (!startDate) {
      toast.error("Please select a start date");
      return;
    }
    if (!endDate) {
      toast.error("Please select an end date");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      toast.error("Start date must be before end date");
      return;
    }

    setIsLoading(true);

    // Simulate download
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    toast.success("Report downloaded successfully!");
    handleClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title=""
      className="max-w-md"
    >
      <div className="text-center">
        {/* Excel Icon */}
        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-lg flex items-center justify-center">
          <FileSpreadsheet className="w-8 h-8 text-green-600" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Export Your Report
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Download your income records by selecting a start and end date.
        </p>

        {/* Date Inputs */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start date
            </label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full"
              placeholder="DD/MM/YYYY"
            />
          </div>
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End date
            </label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full"
              placeholder="DD/MM/YYYY"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDownload}
            disabled={isLoading}
            className="px-6 py-2.5 bg-purple text-white rounded-lg text-sm font-medium hover:bg-purple/90 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Downloading...
              </>
            ) : (
              "Download Now"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
