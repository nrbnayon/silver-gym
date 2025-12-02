// components/modals/ExportReportModal.tsx
"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { ImageIcon } from "@/components/utils/ImageIcon";
import { toast } from "sonner";

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  exportFormat: "pdf" | "excel";
}

export default function ExportReportModal({
  isOpen,
  onClose,
  exportFormat,
}: ExportReportModalProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  if (!isOpen) return null;

  const handleExport = () => {
    // Handle export logic here based on exportFormat, startDate, and endDate
    console.log(`Exporting as ${exportFormat} from ${startDate} to ${endDate}`);
     toast.success(`Report exported successfully as ${exportFormat.toUpperCase()}!`, {
      description: `Date range: ${startDate} to ${endDate}`,
      duration: 3000,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl mx-4">
        {/* Header */}
        <div className="flex items-start gap-4 p-6 border-b">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-50">
            <ImageIcon 
              activeImage={exportFormat === "pdf" ? "/icons/pdf.svg" : "/icons/excel.svg"} 
              size={32} 
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800">Export Your Report</h2>
            <p className="text-sm text-gray-500 mt-1">
              Download your income records by selecting a start and end date.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="12/MM/YYYY"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                />
              </div>
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  placeholder="DD/MM/YYYY"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={!startDate || !endDate}
            className="px-6 py-2.5 text-sm font-medium text-white bg-purple hover:bg-[#6A3FE0] rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Download Now
          </button>
        </div>
      </div>
    </div>
  );
}