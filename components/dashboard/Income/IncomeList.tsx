// components/dashboard/Income/IncomeList.tsx
"use client";

import { useState, useMemo } from "react";
import { Search, FileText, FileSpreadsheet, Plus, Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { incomeData } from "@/data/incomeData";
import { IncomeRecord, DateFilterType } from "@/types/income";
import DateFilterDropdown from "./DateFilterDropdown";
import CategoryFilter from "./CategoryFilter";
import SummaryViewToggle from "./SummaryViewToggle";

export default function IncomeList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<DateFilterType>("today");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showSummaryOnly, setShowSummaryOnly] = useState(false);

  // Filter income data
  const filteredIncome = useMemo(() => {
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-1">Income List</h1>
            <p className="text-sm text-gray-500">
              Easily review and control your company's spending records.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <FileText className="w-4 h-4 text-red-500" />
              Download
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <FileSpreadsheet className="w-4 h-4 text-green-600" />
              Download
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-purple text-white rounded-md hover:bg-[#6A3FE0] transition-colors text-sm md:text-base">
              <Plus className="w-4 h-4" />
              Add Income
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border-8 border-gray-secondary p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex-1 min-w-[250px]">
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

          <SummaryViewToggle
            showSummaryOnly={showSummaryOnly}
            setShowSummaryOnly={setShowSummaryOnly}
          />
        </div>

        {/* Content */}
        {searchQuery === "" && !dateFilter ? (
          // Empty State
          <div className="bg-white rounded-2xl border-8 border-gray-secondary p-12">
            <div className="text-center max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Start Billing by Searching Records
              </h3>
              <p className="text-sm text-gray-500">
                Start typing a member's name, phone number or ID to quickly
                <br />
                find the right person and continue billing
              </p>
            </div>
          </div>
        ) : showSummaryOnly ? (
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
                  {Object.entries(groupedByDate).map(([date, data], index) => (
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
                  ))}
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
            <div className="px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-medium">
                Income Details
              </h3>
            </div>

            <div className="space-y-6">
              {Object.entries(groupedByDate).map(([date, data]) => (
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
                              <button className="text-gray-400 hover:text-gray-600 transition-colors">
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
              ))}
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
            <div className="px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-medium">
                Income Details
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
                  {filteredIncome.map((income, index) => (
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
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
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
                {dateFilter === "today" ? "Today Income" : "Total Income"}
              </span>
              <span className="text-lg font-semibold text-gray-medium">
                {totalIncome.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
