// components/dashboard/Common/TransactionTable.tsx
"use client";

import React, { useState } from "react";
import { FileText, Search, SlidersHorizontal } from "lucide-react";
import { Transaction } from "@/data/transactionData";
import { useRouter } from "next/navigation";
import { ImageIcon } from "@/components/utils/ImageIcon";

interface TransactionTableProps {
  title?: string;
  data: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  title = "Today Transaction",
  data,
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [paymentFilter, setPaymentFilter] = useState<string>("All");

  // Get unique categories and payment methods
  const categories = [
    "All",
    ...Array.from(new Set(data.map((t) => t.category))),
  ];
  const payments = ["All", ...Array.from(new Set(data.map((t) => t.payment)))];

  // Filter data based on search and filters
  const filteredData = data.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.categoryName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      transaction.memberId?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" || transaction.category === categoryFilter;

    const matchesPayment =
      paymentFilter === "All" || transaction.payment === paymentFilter;

    return matchesSearch && matchesCategory && matchesPayment;
  });

  const handleRowClick = (id: string) => {
    // Remove # from id for routing
    const cleanId = id.replace("#", "");
    router.push(`/dashboard/transaction/${cleanId}`);
  };

  const resetFilters = () => {
    setCategoryFilter("All");
    setPaymentFilter("All");
  };

  // Calculate total balance from filtered data
  const totalBalance = filteredData.reduce((acc, transaction) => {
    if (transaction.category === "Expanse") {
      return acc - transaction.amount;
    }
    return acc + transaction.amount;
  }, 0);

  return (
    <div className="w-full bg-white rounded-[20px] p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-lg md:text-xl font-semibold text-gray-medium">
          {title}
        </h2>

        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              placeholder="Search ID/Name/Title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-medium placeholder:text-text-secondary focus:outline-none focus:border-[#AA81FE] transition-colors w-[250px]"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-medium hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="mb-6 p-4 bg-gray-primary rounded-lg">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-medium mb-2">
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-medium focus:outline-none focus:border-[#AA81FE] transition-colors"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-medium mb-2">
                Payment Method
              </label>
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-medium focus:outline-none focus:border-[#AA81FE] transition-colors"
              >
                {payments.map((pay) => (
                  <option key={pay} value={pay}>
                    {pay}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={resetFilters}
              className="px-4 py-2 text-sm text-text-secondary hover:text-gray-medium transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-2 border border-border-2 rounded-3xl p-2">
          <thead>
            <tr>
              <th className="text-left pt-3 pb-5 px-6 text-base font-semibold text-text-primary border-b">
                INV. NO:
              </th>
              <th className="text-left pt-3 pb-5 px-6 text-base font-semibold text-text-primary border-b">
                Date
              </th>
              <th className="text-left pt-3 pb-5 px-6 text-base font-semibold text-text-primary border-b">
                Category / Name
              </th>
              <th className="text-left pt-3 pb-5 px-6 text-base font-semibold text-text-primary border-b">
                Member ID
              </th>
              <th className="text-left pt-3 pb-5 px-6 text-base font-semibold text-text-primary border-b">
                Category
              </th>
              <th className="text-left pt-3 pb-5 px-6 text-base font-semibold text-text-primary border-b">
                Payment
              </th>
              <th className="text-left pt-3 pb-5 px-6 text-base font-semibold text-text-primary border-b">
                Amount
              </th>
              <th className="text-left pt-3 pb-5 px-6 text-base font-semibold text-text-primary border-b">
                Balance
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((transaction, index) => (
                <tr
                  key={index}
                  onClick={() => handleRowClick(transaction.id)}
                  className={`cursor-pointer transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-primary"
                  } hover:bg-[#F2EEFF]  rounded-sm`}
                >
                  <td className="py-4 px-4 text-sm text-gray-medium rounded-l-sm">
                    {transaction.id}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-medium">
                    {transaction.date}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-medium">
                    {transaction.categoryName}
                  </td>
                  <td className="py-4 px-4 text-sm text-text-secondary">
                    {transaction.memberId || "———"}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`text-sm ${
                        transaction.category === "Expanse"
                          ? "text-primary-500"
                          : "text-gray-medium"
                      }`}
                    >
                      {transaction.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-medium">
                    {transaction.payment}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`text-sm font-medium ${
                        transaction.category === "Expanse"
                          ? "text-primary-500"
                          : "text-[#4A9FF5]"
                      }`}
                    >
                      {transaction.amount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-medium rounded-r-sm">
                    {transaction.balance.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-12">
                  {/* Check if original data is empty (no data at all) or just filtered results are empty */}
                  {data.length === 0 ? (
                    // No data at all - show document icon
                    <div className="flex flex-col items-center justify-center gap-3 h-[30vh]">
                        {/* <ImageIcon activeImage="/icons/document.svg" size={56} /> */}
                        <FileText size={56}/>
                      <div className="text-center">
                        <p className="text-base font-medium text-text-primary mb-1">
                          No data available yet
                        </p>
                        <p className="text-sm text-text-secondary max-w-md">
                          Once you start adding members, packages, or transactions,
                          <br />
                          everything will appear here.
                        </p>
                      </div>
                    </div>
                  ) : (
                    // Search/filter returned no results - show sleep icon
                    <div className="flex flex-col items-center justify-center gap-2 h-[30vh]">
                      <ImageIcon activeImage="/icons/sleep.svg" size={56} />
                      <div className="text-center">
                        <p className="text-base">
                          <span className="text-primary-500">Oops!</span>{" "}
                          <span className="text-gray-medium">Nothing matches</span>
                        </p>
                        <p className="text-sm text-gray-medium">your search</p>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 bg-gray-primary p-4 md:pr-20 rounded-lg">
        <p className="text-xl font-semibold text-primary">Balance</p>
        <p className={`text-xl font-semibold  ${
          totalBalance >= 0 ? "text-primary" : "text-primary-500"
        }`}>
          {totalBalance.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
    </div>
  );
};

export default TransactionTable;
