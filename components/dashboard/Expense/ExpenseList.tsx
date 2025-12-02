// components/dashboard/Expense/ExpenseList.tsx
"use client";

import { useState, useMemo } from "react";
import { Expense } from "@/types/expense";
import { expenseCategories } from "@/data/expenseCategories";
import DateFilterDropdown from "../Income/DateFilterDropdown";
import CategoryFilter from "../Income/CategoryFilter";
import SummaryViewToggle from "../Income/SummaryViewToggle";
import { Search, Edit, FileDown, PlusCircle } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignSquareIcon } from "@hugeicons/core-free-icons";

interface ExpenseListProps {
  expenses: Expense[];
  onAddExpense: () => void;
  onEditExpense: (expense: Expense) => void;
  onExport: () => void;
}

export default function ExpenseList({
  expenses,
  onAddExpense,
  onEditExpense,
  onExport,
}: ExpenseListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<"today" | "thisMonth" | "custom" | null>("today");
  const [customStartDate, setCustomStartDate] = useState<Date | null>(null);
  const [customEndDate, setCustomEndDate] = useState<Date | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [showSummaryOnly, setShowSummaryOnly] = useState(false);

  // Filter expenses
  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        expense.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expense.categoryTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expense.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Date filter
      let matchesDate = true;
      const expenseDate = new Date(expense.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (dateFilter === "today") {
        const expenseDateOnly = new Date(expenseDate);
        expenseDateOnly.setHours(0, 0, 0, 0);
        matchesDate = expenseDateOnly.getTime() === today.getTime();
      } else if (dateFilter === "thisMonth") {
        matchesDate =
          expenseDate.getMonth() === today.getMonth() &&
          expenseDate.getFullYear() === today.getFullYear();
      } else if (dateFilter === "custom" && customStartDate && customEndDate) {
        const start = new Date(customStartDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(customEndDate);
        end.setHours(23, 59, 59, 999);
        matchesDate = expenseDate >= start && expenseDate <= end;
      }

      // Category filter
      const matchesCategory =
        !categoryFilter || expense.categoryTitle === categoryFilter;

      return matchesSearch && matchesDate && matchesCategory;
    });
  }, [expenses, searchQuery, dateFilter, customStartDate, customEndDate, categoryFilter]);

  // Group by date
  const groupedByDate = useMemo(() => {
    const grouped: { [key: string]: { records: Expense[]; total: number } } = {};

    filteredExpenses.forEach((expense) => {
      const dateKey = new Date(expense.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      if (!grouped[dateKey]) {
        grouped[dateKey] = { records: [], total: 0 };
      }

      grouped[dateKey].records.push(expense);
      grouped[dateKey].total += expense.amount;
    });

    return grouped;
  }, [filteredExpenses]);

  // Calculate total
  const totalExpense = useMemo(() => {
    return filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [filteredExpenses]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Expense List</h1>
          <p className="text-sm text-gray-500 mt-1">
            Easily review and control your company's spending records.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <FileDown className="w-4 h-4 text-red-500" />
            Download
          </button>
          <button
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <FileDown className="w-4 h-4 text-green-600" />
            Download
          </button>
          <button
            onClick={onAddExpense}
            className="flex items-center gap-2 px-4 py-2 bg-purple text-white rounded-lg text-sm font-medium hover:bg-purple/90 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            Add Expense
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search ID/Name/Title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
          />
        </div>

        {/* Date Filter */}
        <DateFilterDropdown
          value={dateFilter}
          onChange={setDateFilter}
          onCustomDateChange={(start, end) => {
            setCustomStartDate(start);
            setCustomEndDate(end);
          }}
        />

        {/* Category Filter */}
        <CategoryFilter
          categories={expenseCategories.map((cat) => cat.name)}
          value={categoryFilter}
          onChange={setCategoryFilter}
        />

        {/* Summary Toggle */}
        {dateFilter === "custom" && customStartDate && customEndDate && (
          <SummaryViewToggle
            value={showSummaryOnly}
            onChange={setShowSummaryOnly}
          />
        )}
      </div>

      {/* Content */}
      {filteredExpenses.length === 0 ? (
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
      ) : showSummaryOnly ? (
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
                            <td className="px-6 py-4 text-center text-sm text-gray-medium rounded-r-md">
                              <button
                                onClick={() => onEditExpense(expense)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                              >
                                <Edit className="w-4 h-4 inline" />
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
                    <td className="px-6 py-4 text-center text-sm text-gray-medium rounded-r-md">
                      <button
                        onClick={() => onEditExpense(expense)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Edit className="w-4 h-4 inline" />
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
  );
}
