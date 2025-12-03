// components/dashboard/Income/IncomeList.tsx
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { incomeData } from "@/data/incomeData";
import { membersData } from "@/data/memberData";
import { IncomeRecord, DateFilterType } from "@/types/income";
import DateFilterDropdown from "./DateFilterDropdown";
import CategoryFilter from "./CategoryFilter";
import SummaryViewToggle from "./SummaryViewToggle";
import AddIncomeModal from "@/components/modals/AddIncomeModal";
import { ImageIcon } from "@/components/utils/ImageIcon";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignSquareIcon } from "@hugeicons/core-free-icons";
import ExportReportModal from "@/components/modals/ExportReportModal";

export default function IncomeList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<DateFilterType>("today");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showSummaryOnly, setShowSummaryOnly] = useState(false);
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState<"pdf" | "excel">("pdf");

  const incomeColumns = [
    { header: "Date & Time", key: "dateTime" },
    { header: "Invoice No", key: "invoiceNo" },
    { header: "Name", key: "name" },
    { header: "Member ID", key: "memberId" },
    { header: "Category", key: "category" },
    { header: "Payment", key: "payment" },
    { header: "Amount", key: "amount" },
  ];

  const handleExportClick = (format: "pdf" | "excel") => {
    setExportFormat(format);
    setShowExportModal(true);
  };

  // Filter income data
  const filteredIncome = useMemo(() => {
    // ... existing filter logic ...
    let filtered = incomeData;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (income) =>
          income.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
          income.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          income.memberId.includes(searchQuery)
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter((income) => income.category === selectedCategory);
    }

    // Date filter
    if (dateFilter === "today") {
      const today = new Date();
      filtered = filtered.filter((income) => {
        const incomeDate = new Date(income.dateTime);
        return incomeDate.toDateString() === today.toDateString();
      });
    } else if (dateFilter === "thisMonth") {
      const today = new Date();
      filtered = filtered.filter((income) => {
        const incomeDate = new Date(income.dateTime);
        return (
          incomeDate.getMonth() === today.getMonth() &&
          incomeDate.getFullYear() === today.getFullYear()
        );
      });
    } else if (dateFilter === "custom" && customStartDate && customEndDate) {
      const start = new Date(customStartDate);
      const end = new Date(customEndDate);
      filtered = filtered.filter((income) => {
        const incomeDate = new Date(income.dateTime);
        return incomeDate >= start && incomeDate <= end;
      });
    }

    return filtered;
  }, [searchQuery, dateFilter, customStartDate, customEndDate, selectedCategory]);

  // Group by date for summary view
  const groupedByDate = useMemo(() => {
    const groups: { [key: string]: { records: IncomeRecord[]; total: number } } = {};

    filteredIncome.forEach((income) => {
      const date = income.dateTime.split(" ").slice(0, 3).join(" "); // "15 May 2020"
      if (!groups[date]) {
        groups[date] = { records: [], total: 0 };
      }
      groups[date].records.push(income);
      groups[date].total += income.amount;
    });

    return groups;
  }, [filteredIncome]);

  // Calculate total income
  const totalIncome = useMemo(() => {
    return filteredIncome.reduce((sum, income) => sum + income.amount, 0);
  }, [filteredIncome]);

  return (
    <div className="min-h-screen">
      <div className="w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-1">Income List</h1>
            <p className="text-sm text-gray-500">
              Easily review and control your company's spending records.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={() => handleExportClick("pdf")}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <ImageIcon
                activeImage="/icons/pdf.svg"
                size={24}
              />
              Download
            </button>
            <button 
              onClick={() => handleExportClick("excel")}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <ImageIcon
                activeImage="/icons/excel.svg"
                size={24}
              />
              Download
            </button>
            <button 
              onClick={() => setShowAddIncomeModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-purple text-white rounded-md hover:bg-[#6A3FE0] transition-colors text-sm md:text-base cursor-pointer"
            >
              <HugeiconsIcon icon={PlusSignSquareIcon} size={24} />
              Add Income
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border-8 border-gray-secondary p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4 mb-4 flex items-center justify-between">
            <div className="flex-1 max-w-[300px] h-10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search ID/Name/Title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 border-gray-300 focus:border-primary focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <DateFilterDropdown
              dateFilter={dateFilter}
              setDateFilter={setDateFilter}
              customStartDate={customStartDate}
              setCustomStartDate={setCustomStartDate}
              customEndDate={customEndDate}
              setCustomEndDate={setCustomEndDate}
            />

            <CategoryFilter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            </div>
          </div>

          <div className="flex items-center justify-end"><SummaryViewToggle
            showSummaryOnly={showSummaryOnly}
            setShowSummaryOnly={setShowSummaryOnly}
          /></div>
        </div>

        {/* Content */}
        {showSummaryOnly ? (
          // Summary View
          <div className="bg-white rounded-2xl border-8 border-gray-secondary overflow-hidden p-3">
            <div className="px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-medium">
                Income Summary
              </h3>
            </div>

            <div className="overflow-auto">
              <table className="w-full border-separate border-spacing-y-0.5 border border-border-2 rounded-lg px-2">
                <thead>
                  <tr>
                    <th className="px-6 py-4 text-left text-base font-semibold text-text-primary border-b">
                      Date & Time
                    </th>
                    <th className="px-6 py-4 text-right text-base font-semibold text-text-primary border-b">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 overflow-y-auto">
                  {Object.keys(groupedByDate).length === 0 ? (
                    <tr>
                      <td colSpan={2} className="px-6 py-12 text-center text-gray-500">
                        No income records found for this period.
                      </td>
                    </tr>
                  ) : (
                    Object.entries(groupedByDate).map(([date, data], index) => (
                      <tr
                        key={date}
                        className={`transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-primary"
                        } hover:bg-[#F2EEFF] rounded-md`}
                      >
                        <td className="px-6 py-4 text-sm text-gray-medium rounded-l-md">
                          {date}
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-gray-medium rounded-r-md">
                          {data.total.toFixed(2)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-4 bg-gray-primary p-4 rounded-lg">
              <span className="text-lg font-semibold text-gray-medium">Total Income</span>
              <span className="text-lg font-semibold text-gray-medium">
                {totalIncome.toFixed(2)}
              </span>
            </div>
          </div>
        ) : dateFilter === "custom" && customStartDate && customEndDate ? (
          // Grouped by Date View
          <div className="bg-white rounded-2xl border-8 border-gray-secondary overflow-hidden p-3">
            <div className="pb-4">
              <h3 className="text-lg font-semibold text-gray-medium">
                Income source
              </h3>
            </div>

            <div className="space-y-6">
              {Object.keys(groupedByDate).length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <div className="w-12 h-12 mx-auto mb-3 text-gray-400">
                    <HugeiconsIcon icon={PlusSignSquareIcon} size={48} />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900">No Records Found</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    No income records found for the selected date range.
                  </p>
                </div>
              ) : (
                Object.entries(groupedByDate).map(([date, data]) => (
                  <div key={date}>
                    <div className="px-6 py-2 bg-gray-primary rounded-lg mb-2">
                      <h4 className="text-sm font-semibold text-gray-medium">{date}</h4>
                    </div>

                    <div className="overflow-auto">
                      <table className="w-full border-separate border-spacing-y-0.5 border border-border-2 rounded-lg px-2">
                        <thead>
                          <tr>
                            <th className="px-6 py-4 text-left text-base font-semibold text-text-primary border-b">
                              Date & Time
                            </th>
                            <th className="px-6 py-4 text-left text-base font-semibold text-text-primary border-b">
                              INV-NO
                            </th>
                            <th className="px-6 py-4 text-left text-base font-semibold text-text-primary border-b">
                              Name
                            </th>
                            <th className="px-6 py-4 text-left text-base font-semibold text-text-primary border-b">
                              Member ID
                            </th>
                            <th className="px-6 py-4 text-left text-base font-semibold text-text-primary border-b">
                              Category
                            </th>
                            <th className="px-6 py-4 text-center text-base font-semibold text-text-primary border-b">
                              Payment
                            </th>
                            <th className="px-6 py-4 text-right text-base font-semibold text-text-primary border-b">
                              Amount
                            </th>
                            <th className="px-6 py-4 text-center text-base font-semibold text-text-primary border-b">
                              View
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 overflow-y-auto">
                          {data.records.map((income, index) => (
                            <tr
                              key={income.id}
                              className={`transition-colors ${
                                index % 2 === 0 ? "bg-white" : "bg-gray-primary"
                              } hover:bg-[#F2EEFF] rounded-md`}
                            >
                              <td className="px-6 py-4 text-sm text-gray-medium rounded-l-md">
                                {income.dateTime}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-medium">
                                {income.invoiceNo}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-medium">
                                {income.name}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-medium">
                                {income.memberId}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-medium">
                                {income.category}
                              </td>
                              <td className="px-6 py-4 text-center text-sm text-gray-medium">
                                {income.payment}
                              </td>
                              <td className="px-6 py-4 text-right text-sm text-gray-medium">
                                {income.amount.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 text-center text-sm text-gray-medium rounded-r-md">
                                <button 
                                  onClick={() => router.push(`/dashboard/income/create-bill/${income.memberId}`)}
                                  className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer hover:scale-110"
                                >
                                  <ImageIcon
                                    activeImage="/icons/edit.svg"
                                    size={20}
                                  />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-between items-center mt-2 bg-gray-primary p-4 rounded-lg">
                      <span className="text-sm font-semibold text-gray-medium">Total</span>
                      <span className="text-sm font-semibold text-gray-medium">
                        {data.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-between items-center mt-4 bg-gray-primary p-4 rounded-lg">
              <span className="text-lg font-semibold text-gray-medium">Total Income</span>
              <span className="text-lg font-semibold text-gray-medium">
                {totalIncome.toFixed(2)}
              </span>
            </div>
          </div>
        ) : (
          // Regular Table View
          <div className="bg-white rounded-2xl border-8 border-gray-secondary overflow-hidden p-3">
            <div className="pb-4">
              <h3 className="text-lg font-semibold text-gray-medium">
                Income source
              </h3>
            </div>

            <div className="overflow-auto">
              <table className="w-full border-separate border-spacing-y-0.5 border border-border-2 rounded-lg px-2">
                <thead>
                  <tr>
                    <th className="px-6 py-4 text-left text-base font-semibold text-text-primary border-b">
                      Date & Time
                    </th>
                    <th className="px-6 py-4 text-left text-base font-semibold text-text-primary border-b">
                      INV-NO
                    </th>
                    <th className="px-6 py-4 text-left text-base font-semibold text-text-primary border-b">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-base font-semibold text-text-primary border-b">
                      Member ID
                    </th>
                    <th className="px-6 py-4 text-left text-base font-semibold text-text-primary border-b">
                      Category
                    </th>
                    <th className="px-6 py-4 text-center text-base font-semibold text-text-primary border-b">
                      Payment
                    </th>
                    <th className="px-6 py-4 text-right text-base font-semibold text-text-primary border-b">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-center text-base font-semibold text-text-primary border-b">
                      View
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 overflow-y-auto">
                  {filteredIncome.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-12 h-12 mb-3 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                            <HugeiconsIcon icon={PlusSignSquareIcon} size={24} />
                          </div>
                          <h3 className="text-base font-semibold text-gray-900 mb-1">
                            {searchQuery ? "No Search Results" : "No Records Found"}
                          </h3>
                          <p className="text-sm text-gray-500 mb-4 max-w-xs">
                            {searchQuery 
                              ? `No records found matching "${searchQuery}"`
                              : "There are no income records for the selected period."}
                          </p>
                          <button 
                            onClick={() => setShowAddIncomeModal(true)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-purple text-white rounded-md hover:bg-[#6A3FE0] transition-colors text-sm font-medium"
                          >
                            <HugeiconsIcon icon={PlusSignSquareIcon} size={16} />
                            Add Income
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredIncome.map((income, index) => (
                      <tr
                        key={income.id}
                        className={`transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-primary"
                        } hover:bg-[#F2EEFF] rounded-md`}
                      >
                        <td className="px-6 py-4 text-sm text-gray-medium rounded-l-md">
                          {income.dateTime}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-medium">
                          {income.invoiceNo}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-medium">
                          {income.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-medium">
                          {income.memberId}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-medium">
                          {income.category}
                        </td>
                        <td className="px-6 py-4 text-center text-sm text-gray-medium">
                          {income.payment}
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-gray-medium">
                          {income.amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-center text-sm text-gray-medium rounded-r-md">
                          <button 
                            onClick={() => router.push(`/dashboard/income/create-bill/${income.memberId}`)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <Edit className="w-4 h-4 inline" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-4 bg-gray-primary p-4 rounded-lg">
              <span className="text-lg font-semibold text-gray-medium">
                {dateFilter === "today" ? "Today Income" : "Total Income"}
              </span>
              <span className="text-lg font-semibold text-gray-medium">
                {totalIncome.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>

      <AddIncomeModal
        isOpen={showAddIncomeModal}
        onClose={() => setShowAddIncomeModal(false)}
        members={membersData}
      />

      <ExportReportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        exportFormat={exportFormat}
        data={incomeData}
        reportType="Income"
        columns={incomeColumns}
      />
    </div>
  );
}