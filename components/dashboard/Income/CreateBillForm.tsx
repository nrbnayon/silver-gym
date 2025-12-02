// components/dashboard/Income/CreateBillForm.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Member } from "@/types/member";
import { Input } from "@/components/ui/input";
import { Check, ChevronDown, Printer } from "lucide-react";

interface CreateBillFormProps {
  member: Member;
  onCancel: () => void;
  onSave: () => void;
}

export default function CreateBillForm({ member, onCancel, onSave }: CreateBillFormProps) {
  const [selectedPackage, setSelectedPackage] = useState("Monthly");
  const [monthlyAmount, setMonthlyAmount] = useState("1000.00");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const months = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
  ];

  const toggleMonth = (month: string) => {
    if (selectedMonths.includes(month)) {
      setSelectedMonths(selectedMonths.filter(m => m !== month));
    } else {
      setSelectedMonths([...selectedMonths, month]);
    }
  };

  // Mock payment history
  const paymentHistory = [
    { month: "Jun", package: "Quarterly Yearly", amount: "15,000.00", status: "Pay" },
    { month: "Jun", package: "Quarterly Yearly", amount: "15,000.00", status: "Pay" },
    { month: "Jul", package: "Monthly", amount: "15,000.00", status: "Pay" },
    { month: "Jun", package: "Quarterly Yearly", amount: "15,000.00", status: "Pay" },
    { month: "Jul", package: "Monthly", amount: "15,000.00", status: "Pay" },
    { month: "Jun", package: "Quarterly Yearly", amount: "15,000.00", status: "Pay" },
    { month: "Jul", package: "Monthly", amount: "15,000.00", status: "Pay" },
    { month: "Aug", package: "Half-Yearly", amount: "2,000.00", status: "Due" },
    { month: "Sep", package: "Half-Yearly", amount: "2,000.00", status: "Due" },
  ];

  const subTotal = selectedMonths.length * parseFloat(monthlyAmount.replace(/,/g, ""));
  const discount = 0;
  const dueAmount = 0;
  const paidTotal = subTotal - discount;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-lg w-full max-w-6xl mx-auto p-6 print:p-0 print:max-w-none">
      <h2 className="text-xl font-bold text-gray-900 mb-6 print:hidden">Create Bill</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 print:block print:gap-0">
        {/* Left Column - Member Info & Payment List */}
        <div className="print:mb-8">
          {/* Member Info Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 flex items-start gap-4 print:border-0 print:p-0">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 print:hidden">
              {member.profileImage ? (
                <Image
                  src={member.profileImage}
                  alt={member.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xl font-bold text-gray-400">
                  {member.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                  <span className={`inline-block px-2 py-0.5 text-xs rounded mt-1 ${
                    member.status === "Active" ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-600"
                  } print:hidden`}>
                    {member.status}
                  </span>
                </div>
                <div className="bg-gray-50 px-3 py-1 rounded text-sm text-gray-600 print:bg-transparent print:p-0">
                  ID: {member.memberId || "12434"}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info Inputs */}
          <div className="grid grid-cols-2 gap-4 mb-6 print:hidden">
            <input
              type="text"
              value={member.name}
              readOnly
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded text-gray-600 text-sm"
            />
            <input
              type="text"
              value={member.phone}
              readOnly
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded text-gray-600 text-sm"
            />
          </div>

          {/* Payment List */}
          <div className="print:hidden">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium text-gray-700">Payment List</h4>
              <span className="text-xs text-red-500 font-medium">Due: 2 months</span>
            </div>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="grid grid-cols-4 bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-600">
                <div>Month</div>
                <div>Package</div>
                <div className="text-right">Amount</div>
                <div className="text-right">Status</div>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {paymentHistory.map((item, index) => (
                  <div key={index} className="grid grid-cols-4 px-4 py-3 border-b border-gray-100 text-sm last:border-0">
                    <div className="text-gray-600">{item.month}</div>
                    <div className="text-gray-600">{item.package}</div>
                    <div className="text-right text-gray-900">{item.amount}</div>
                    <div className={`text-right font-medium ${
                      item.status === "Due" ? "text-red-500" : "text-gray-900"
                    }`}>
                      {item.status}
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white border-t border-gray-200 px-4 py-3 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Total Due (2 months)</span>
                <span className="text-sm font-bold text-red-500">4,000.00 TK</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Membership Details */}
        <div>
          <div className="mb-6 print:hidden">
            <h3 className="text-lg font-semibold text-gray-900">Membership Details</h3>
            <p className="text-xs text-gray-500">Package selection and payment calculation</p>
          </div>
          
          <div className="hidden print:block mb-6">
             <h1 className="text-2xl font-bold mb-2">Invoice</h1>
             <p className="text-sm text-gray-600">Date: {new Date().toLocaleDateString()}</p>
          </div>

          {/* Select Package */}
          <div className="mb-4 print:hidden">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Package</label>
            <div className="relative">
              <select
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg appearance-none bg-white text-sm text-gray-700 focus:outline-none focus:border-purple"
              >
                <option>Monthly</option>
                <option>Quarterly</option>
                <option>Yearly</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          
          <div className="hidden print:block mb-4">
            <p className="text-sm"><strong>Package:</strong> {selectedPackage}</p>
          </div>

          {/* Monthly Fee */}
          <div className="mb-4 print:hidden">
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Fee</label>
            <p className="text-xs text-gray-500 mb-2">Choose whether this package should include the admission fee</p>
            <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">
              <span className="text-sm text-gray-600">Monthly Amount</span>
              <span className="text-sm font-medium text-gray-900">{monthlyAmount}</span>
            </div>
          </div>

          {/* Year Selection */}
          <div className="mb-4 print:hidden">
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg appearance-none bg-white text-sm text-gray-700 focus:outline-none focus:border-purple"
              >
                <option>2024</option>
                <option>2025</option>
                <option>2026</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Month Selection */}
          <div className="grid grid-cols-4 gap-3 mb-6 print:hidden">
            {months.map((month) => (
              <button
                key={month}
                onClick={() => toggleMonth(month)}
                className={`flex items-center justify-center gap-2 px-2 py-2 rounded border text-sm transition-colors ${
                  selectedMonths.includes(month)
                    ? "border-purple text-purple bg-purple/5"
                    : "border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                  selectedMonths.includes(month) ? "border-purple bg-purple text-white" : "border-gray-300"
                }`}>
                  {selectedMonths.includes(month) && <Check className="w-3 h-3" />}
                </div>
                {month}
              </button>
            ))}
          </div>
          
          <div className="hidden print:block mb-4">
             <p className="text-sm"><strong>Months:</strong> {selectedMonths.join(", ")} {selectedYear}</p>
          </div>

          {/* Next Payment Date */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 mb-6 flex justify-between items-center print:bg-transparent print:border-0 print:p-0 print:mb-2">
            <span className="text-sm text-gray-600">Next Payment Date</span>
            <span className="text-sm font-medium text-gray-900">31/01/2026</span>
          </div>

          {/* Totals */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-700">Sub Total</span>
              <span className="text-sm font-bold text-gray-900">{subTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Discount</span>
              <div className="w-24 print:hidden">
                <Input
                  type="text"
                  value={discount.toFixed(2)}
                  className="text-right h-8 text-sm"
                  readOnly
                />
              </div>
              <span className="hidden print:block text-sm">{discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Due Amount</span>
              <div className="w-24 print:hidden">
                <Input
                  type="text"
                  value={dueAmount.toFixed(2)}
                  className="text-right h-8 text-sm"
                  readOnly
                />
              </div>
              <span className="hidden print:block text-sm">{dueAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center bg-gray-50 p-2 rounded print:bg-transparent print:p-0 print:border-t print:border-gray-300 print:mt-2">
              <span className="text-sm font-bold text-gray-900">Paid Total</span>
              <span className="text-sm font-bold text-gray-900">{paidTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-6 print:hidden">
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 flex justify-between items-center">
              <span className="text-sm text-gray-600">Payment Method</span>
              <div className="relative">
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="appearance-none bg-transparent text-sm font-medium text-gray-900 pr-6 focus:outline-none"
                >
                  <option>Cash</option>
                  <option>Bank</option>
                  <option>Bkash</option>
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
          
          <div className="hidden print:block mb-6">
            <p className="text-sm"><strong>Payment Method:</strong> {paymentMethod}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 print:hidden">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="flex-1 px-4 py-2.5 bg-purple text-white rounded-lg text-sm font-medium hover:bg-purple/90 transition-colors"
            >
              Save
            </button>
            <button 
              onClick={handlePrint}
              className="flex-1 px-4 py-2.5 bg-[#E25C3C] text-white rounded-lg text-sm font-medium hover:bg-[#E25C3C]/90 transition-colors flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
