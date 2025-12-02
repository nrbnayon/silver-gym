// components/dashboard/Expense/ExpenseList.tsx
"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { expenseData } from "@/data/expenseData";
import { expenseCategories } from "@/data/expenseCategories";
import { Expense } from "@/types/expense";
import { DateFilterType } from "@/types/income";
import DateFilterDropdown from "../Income/DateFilterDropdown";
import CategoryFilter from "../Income/CategoryFilter";
import SummaryViewToggle from "../Income/SummaryViewToggle";
import AddExpenseModal from "@/components/modals/AddExpenseModal";
import ExportReportModal from "@/components/modals/ExportReportModal";
import { ImageIcon } from "@/components/utils/ImageIcon";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignSquareIcon } from "@hugeicons/core-free-icons";
import { toast } from "sonner";

export default function ExpenseList() {
  const [expenses, setExpenses] = useState<Expense[]>(expenseData);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<DateFilterType>("today");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showSummaryOnly, setShowSummaryOnly] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState<"pdf" | "excel">("pdf");

  // Filter expenses
  const filteredExpenses = useMemo(() => {
    let filtered = expenses;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (expense) =>
          expense.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
          expense.categoryTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          expense.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter((expense) => expense.categoryTitle === selectedCategory);
    }

    // Date filter
    if (dateFilter === "today") {
      const today = new Date();
      filtered = filtered.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate.toDateString() === today.toDateString();
      });
    } else if (dateFilter === "thisMonth") {
      const today = new Date();
      filtered = filtered.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return (
          expenseDate.getMonth() === today.getMonth() &&
          expenseDate.getFullYear() === today.getFullYear()
        );
      });
    } else if (dateFilter === "custom" && customStartDate && customEndDate) {
      const start = new Date(customStartDate);
      const end = new Date(customEndDate);
      filtered = filtered.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= start && expenseDate <= end;
      });
    }

    return filtered;
  }, [expenses, searchQuery, dateFilter, customStartDate, customEndDate, selectedCategory]);

  // Group by date for summary view
  const groupedByDate = useMemo(() => {
    const groups: { [key: string]: { records: Expense[]; total: number } } = {};

    filteredExpenses.forEach((expense) => {
      const date = expense.dateTime.split(" ").slice(0, 3).join(" "); // "15 May 2020"
      if (!groups[date]) {
        groups[date] = { records: [], total: 0 };
      }
      groups[date].records.push(expense);
      groups[date].total += expense.amount;
    });

    return groups;
  }, [filteredExpenses]);

  // Calculate total expense
  const totalExpense = useMemo(() => {
    return filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [filteredExpenses]);

  const handleAddExpense = (newExpense: {
    subcategory: string;
    category: string;
    description: string;
    amount: number;
    paymentMethod: string;
  }) => {
    const expense: Expense = {
      id: `exp-${Date.now()}`,
      dateTime: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }) + " " + new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      invoiceNo: "#" + Math.floor(100000 + Math.random() * 900000),
      categoryTitle: newExpense.category,
      subcategory: newExpense.subcategory,
      description: newExpense.description,
      payment: newExpense.paymentMethod as "Cash" | "Bank" | "Bkash" | "Due",
      amount: newExpense.amount,
      date: new Date(),
    };

    setExpenses([expense, ...expenses]);
  };

  const handleExportClick = (format: "pdf" | "excel") => {
    setExportFormat(format);
    setShowExportModal(true);
  };

  return (
    <div className="min-h-screen">
      <div className="w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-1">Expense List</h1>
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
              onClick={() => setShowAddExpenseModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-purple text-white rounded-md hover:bg-[#6A3FE0] transition-colors text-sm md:text-base cursor-pointer"
            >
              <HugeiconsIcon icon={PlusSignSquareIcon} size={24} />
              Add Expense
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

          <div className="flex items-center justify-end">
            <SummaryViewToggle
              showSummaryOnly={showSummaryOnly}
              setShowSummaryOnly={setShowSummaryOnly}
            />
          </div>
        </div>

        {/* Content */}
        {showSummaryOnly ? (
          // Summary View
          <div className="bg-white rounded-2xl border-8 border-gray-secondary overflow-hidden p-3">
            <div className="px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-medium">
                Expense Summary
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
                        No expense records found for this period.
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
              <span className="text-lg font-semibold text-gray-medium">Total Expense</span>
              <span className="text-lg font-semibold text-gray-medium">
                {totalExpense.toFixed(2)}
              </span>
            </div>
          </div>
        ) : dateFilter === "custom" && customStartDate && customEndDate ? (
          // Grouped by Date View
          <div className="bg-white rounded-2xl border-8 border-gray-secondary overflow-hidden p-3">
            <div className="pb-4">
              <h3 className="text-lg font-semibold text-gray-medium">
                Expense List
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
                    No expense records found for the selected date range.
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
                              INV: NO:
                            </th>
                            <th className="px-6 py-4 text-left text-base font-semibold text-text-primary border-b">
                              Category Title
                            </th>
                            <th className="px-6 py-4 text-left text-base font-semibold text-text-primary border-b">
                              Description
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
                          {data.records.map((expense, index) => (
                            <tr
                              key={expense.id}
                              className={`transition-colors ${
                                index % 2 === 0 ? "bg-white" : "bg-gray-primary"
                              } hover:bg-[#F2EEFF] rounded-md`}
                            >
                              <td className="px-6 py-4 text-sm text-gray-medium rounded-l-md">
                                {expense.dateTime}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-medium">
                                {expense.invoiceNo}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-medium">
                                {expense.categoryTitle}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-medium max-w-xs truncate">
                                {expense.description}
                              </td>
                              <td className="px-6 py-4 text-center text-sm text-gray-medium">
                                {expense.payment}
                              </td>
                              <td className="px-6 py-4 text-right text-sm text-gray-medium">
                                {expense.amount.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 text-center text-sm text-gray-medium rounded-r-md cursor-pointer hover:scale-110">
                                <button
                                  onClick={() => setShowAddExpenseModal(true)}
                                  className="text-gray-400 hover:text-gray-600 transition-colors"
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
              <span className="text-lg font-semibold text-gray-medium">Total Expense</span>
              <span className="text-lg font-semibold text-gray-medium">
                {totalExpense.toFixed(2)}
              </span>
            </div>
          </div>
        ) : filteredExpenses.length === 0 ? (
          // Empty State
          <div className="bg-white rounded-2xl border-8 border-gray-secondary p-12">
            <div className="text-center max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <HugeiconsIcon icon={PlusSignSquareIcon} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Start Billing by Searching Records
              </h3>
              <p className="text-sm text-gray-500">
                Start typing the expense category or title name to quickly
                <br />
                search and proceed.
              </p>
            </div>
          </div>
        ) : (
          // Regular Table View
          <div className="bg-white rounded-2xl border-8 border-gray-secondary overflow-hidden p-3">
            <div className="pb-4">
              <h3 className="text-lg font-semibold text-gray-medium">
                Expense List
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
                      INV: NO:
                    </th>
                    <th className="px-6 py-4 text-left text-base font-semibold text-text-primary border-b">
                      Category Title
                    </th>
                    <th className="px-6 py-4 text-left text-base font-semibold text-text-primary border-b">
                      Description
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
                  {filteredExpenses.map((expense, index) => (
                    <tr
                      key={expense.id}
                      className={`transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-primary"
                      } hover:bg-[#F2EEFF] rounded-md`}
                    >
                      <td className="px-6 py-4 text-sm text-gray-medium rounded-l-md">
                        {expense.dateTime}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-medium">
                        {expense.invoiceNo}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-medium">
                        {expense.categoryTitle}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-medium max-w-xs truncate">
                        {expense.description}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-medium">
                        {expense.payment}
                      </td>
                      <td className="px-6 py-4 text-right text-sm text-gray-medium">
                        {expense.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-medium rounded-r-md ">
                        <button
                          onClick={() => setShowAddExpenseModal(true)}
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

            <div className="flex justify-between items-center mt-4 bg-gray-primary p-4 rounded-lg">
              <span className="text-lg font-semibold text-gray-medium">
                {dateFilter === "today" ? "Today Expense" : "Total Expense"}
              </span>
              <span className="text-lg font-semibold text-gray-medium">
                {totalExpense.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>

      <AddExpenseModal
        isOpen={showAddExpenseModal}
        onClose={() => setShowAddExpenseModal(false)}
        onSave={handleAddExpense}
      />

      <ExportReportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        exportFormat={exportFormat}
      />
    </div>
  );
}