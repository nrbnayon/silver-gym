// components/modals/ExportReportModal.tsx
"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { ImageIcon } from "@/components/utils/ImageIcon";
import { toast } from "sonner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  exportFormat: "pdf" | "excel";
  data: any[];
  reportType: "Income" | "Expense";
  columns: { header: string; key: string }[];
}

export default function ExportReportModal({
  isOpen,
  onClose,
  exportFormat,
  data,
  reportType,
  columns,
}: ExportReportModalProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const filterDataByDateRange = () => {
    if (!startDate || !endDate) return data;

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Include the entire end date

    return data.filter((item) => {
      // Handle both 'dateTime' and 'date' properties
      const dateStr = item.dateTime || item.date;
      const itemDate = new Date(dateStr);
      return itemDate >= start && itemDate <= end;
    });
  };

  const exportToPDF = () => {
    const filteredData = filterDataByDateRange();
    
    if (filteredData.length === 0) {
      toast.error("No data available for the selected date range");
      return;
    }

    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(`${reportType} Report`, 14, 20);
    
    // Add date range
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Date Range: ${startDate} to ${endDate}`, 14, 30);
    doc.text(`Total Records: ${filteredData.length}`, 14, 37);
    
    // Calculate total amount
    const totalAmount = filteredData.reduce((sum, item) => sum + (item.amount || 0), 0);
    doc.text(`Total Amount: ${totalAmount.toFixed(2)}`, 14, 44);
    
    // Prepare table data
    const tableData = filteredData.map((item) =>
      columns.map((col) => {
        const value = item[col.key];
        if (col.key === "amount" && typeof value === "number") {
          return value.toFixed(2);
        }
        return value || "";
      })
    );

    // Add table
    autoTable(doc, {
      head: [columns.map((col) => col.header)],
      body: tableData,
      startY: 50,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [124, 58, 237], textColor: 255 },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { top: 50 },
    });

    // Save the PDF
    const filename = `${reportType}_Report_${startDate}_to_${endDate}.pdf`;
    doc.save(filename);
  };

  const exportToExcel = () => {
    const filteredData = filterDataByDateRange();
    
    if (filteredData.length === 0) {
      toast.error("No data available for the selected date range");
      return;
    }

    // Prepare data for Excel
    const excelData = filteredData.map((item) => {
      const row: any = {};
      columns.forEach((col) => {
        const value = item[col.key];
        if (col.key === "amount" && typeof value === "number") {
          row[col.header] = value.toFixed(2);
        } else {
          row[col.header] = value || "";
        }
      });
      return row;
    });

    // Add summary row
    const totalAmount = filteredData.reduce((sum, item) => sum + (item.amount || 0), 0);
    const summaryRow: any = {};
    columns.forEach((col, index) => {
      if (index === 0) {
        summaryRow[col.header] = "TOTAL";
      } else if (col.key === "amount") {
        summaryRow[col.header] = totalAmount.toFixed(2);
      } else {
        summaryRow[col.header] = "";
      }
    });
    excelData.push(summaryRow);

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    const columnWidths = columns.map((col) => ({
      wch: col.header.length + 5,
    }));
    worksheet["!cols"] = columnWidths;

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `${reportType} Report`);

    // Save the file
    const filename = `${reportType}_Report_${startDate}_to_${endDate}.xlsx`;
    XLSX.writeFile(workbook, filename);
  };

  const handleExport = () => {
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates");
      return;
    }

    setIsExporting(true);

    try {
      if (exportFormat === "pdf") {
        exportToPDF();
      } else {
        exportToExcel();
      }

      toast.success(
        `Report exported successfully as ${exportFormat.toUpperCase()}!`,
        {
          description: `Date range: ${startDate} to ${endDate}`,
          duration: 3000,
        }
      );
      onClose();
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export report. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl mx-4">
        {/* Header */}
        <div className="flex items-start gap-4 p-6 border-b">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-50">
            <ImageIcon
              activeImage={
                exportFormat === "pdf" ? "/icons/pdf.svg" : "/icons/excel.svg"
              }
              size={32}
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800">
              Export Your Report
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Download your {reportType.toLowerCase()} records by selecting a start and end date.
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
            disabled={isExporting}
            className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={!startDate || !endDate || isExporting}
            className="px-6 py-2.5 text-sm font-medium text-white bg-purple hover:bg-[#6A3FE0] rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isExporting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Exporting...
              </>
            ) : (
              "Download Now"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}