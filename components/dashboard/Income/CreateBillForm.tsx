// components/dashboard/Income/CreateBillForm.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Member } from "@/types/member";
import { Input } from "@/components/ui/input";
import { Check, ChevronDown, Printer } from "lucide-react";
import { toast } from "sonner";

interface CreateBillFormProps {
  member: Member;
  onCancel: () => void;
  onSave: () => void;
}

type MonthStatus = "paid" | "due" | "available";

interface MonthState {
  name: string;
  status: MonthStatus;
  index: number;
}

export default function CreateBillForm({ member, onCancel, onSave }: CreateBillFormProps) {
  const [selectedPackage, setSelectedPackage] = useState("Monthly");
  const [monthlyAmount, setMonthlyAmount] = useState(1000);
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [isLoading, setIsLoading] = useState(false);

  // Realistic payment history based on the images
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

  // Define month states: paid (Jan-Aug), due (Sep-Oct), available (Nov-Dec)
  const getMonthStates = (): MonthState[] => {
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr",
      "May", "Jun", "Jul", "Aug",
      "Sep", "Oct", "Nov", "Dec"
    ];

    return monthNames.map((name, index) => {
      let status: MonthStatus = "available";
      
      // Jan-Aug are paid
      if (index <= 7) {
        status = "paid";
      }
      // Sep-Oct are due
      else if (index === 8 || index === 9) {
        status = "due";
      }
      // Nov-Dec are available
      else {
        status = "available";
      }

      return { name, status, index };
    });
  };

  const monthStates = getMonthStates();

  const toggleMonth = (month: string, status: MonthStatus) => {
    // Can't select paid months
    if (status === "paid") return;

    if (selectedMonths.includes(month)) {
      setSelectedMonths(selectedMonths.filter(m => m !== month));
    } else {
      setSelectedMonths([...selectedMonths, month]);
    }
  };

  // Calculate totals
  const subTotal = selectedMonths.length * monthlyAmount;
  const discount = 0;
  const dueAmount = 0;
  const paidTotal = subTotal - discount;

  // Count due months
  const dueMonths = monthStates.filter(m => m.status === "due").length;
  const totalDueAmount = dueMonths * 2000; // Based on payment history

  const handlePrint = () => {
    window.print();
  };

  const handleSave = async () => {
    if (selectedMonths.length === 0) {
      toast.error("Please select at least one month to pay");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    toast.success(`Payment of ${paidTotal.toLocaleString()} TK saved successfully!`);
    
    // Call parent onSave after a short delay
    setTimeout(() => {
      onSave();
    }, 500);
  };

  return (
    <div className="bg-white rounded-lg w-full p-6 print:p-0 print:max-w-none">
      <h2 className="text-xl font-bold text-text-primary mb-6 print:hidden">Create Bill</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 print:block print:gap-0">
        {/* Left Column - Member Info & Payment List */}
        <div className="print:mb-8 border-border p-3 rounded-lg col-span-2">
          {/* Member Info Card */}
          <div className="bg-white border border-border-2 rounded-lg p-4 mb-6 flex items-start gap-4 print:border-0 print:p-0">
            <div className="w-16 h-16 rounded-sm overflow-hidden bg-gray-100 flex-shrink-0 print:hidden border p-1">
              {member.profileImage ? (
                <Image
                  src={member.profileImage}
                  alt={member.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover rounded-sm"
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
                  <h3 className="text-lg font-bold text-text-primary">{member.name}</h3>
                  <span className={`inline-block px-2 py-0.5 text-xs rounded-sm mt-1 ${
                    member.status === "Active" ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-600"
                  } print:hidden`}>
                    {member.status}
                  </span>
                </div>
                <div className="bg-gray-primary h-10 flex items-center px-3 py-1 rounded-sm text-sm text-gray-medium print:bg-transparent print:p-0">
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
              className="w-full px-4 py-2 border border-border-2 rounded-sm h-11 text-gray-medium text-sm"
            />
            <input
              type="text"
              value={member.phone}
              readOnly
              className="w-full px-4 py-2 border border-border-2 rounded-sm h-11 text-gray-medium text-sm"
            />
          </div>

          {/* Payment List */}
          <div className="print:hidden">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium text-gray-medium">Payment List</h4>
              <span className="text-xs text-red-500 font-medium">Due: {dueMonths} months</span>
            </div>
            <div className="border border-border-2 rounded-lg overflow-hidden p-2">
              <div className="grid grid-cols-4 bg-[#E1E1E1] px-4 py-3 text-xs font-semibold text-gray-medium rounded-sm">
                <div>Month</div>
                <div>Package</div>
                <div className="text-right">Amount</div>
                <div className="text-right">Status</div>
              </div>
              <div className="max-h-auto overflow-y-auto">
                {paymentHistory.map((item, index) => (
                  <div key={index} className="grid grid-cols-4 px-4 py-3 border-b border-gray-100 text-sm last:border-0">
                    <div className="text-gray-medium">{item.month}</div>
                    <div className="text-gray-medium">{item.package}</div>
                    <div className="text-right text-gray-medium">{item.amount}</div>
                    <div className={`text-right font-medium ${
                      item.status === "Due" ? "text-red-500" : "text-gray-900"
                    }`}>
                      {item.status}
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white border-t border-gray-200 px-4 py-3 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-medium">Total Due ({dueMonths} months)</span>
                <span className="text-sm font-bold text-red-500">{totalDueAmount.toLocaleString()}.00 TK</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Membership Details */}
        <div className="border-border p-4 rounded-lg">
          <div className="mb-6 print:hidden">
            <h3 className="text-lg font-semibold text-text-primary">Membership Details</h3>
            <p className="text-xs text-gray-medium">Package selection and payment calculation</p>
          </div>
          
          <div className="hidden print:block mb-6">
             <h1 className="text-2xl font-bold mb-2">Invoice</h1>
             <p className="text-sm text-gray-medium">Date: {new Date().toLocaleDateString()}</p>
          </div>

          {/* Select Package */}
          <div className="mb-4 print:hidden">
            <label className="block text-sm font-medium text-gray-medium mb-1">Select Package</label>
            <div className="relative">
              <select
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
                className="w-full px-4 py-3 border border-border-2 rounded-sm appearance-none bg-white text-sm text-gray-medium focus:outline-none focus:border-purple"
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
            <label className="block text-sm font-medium text-gray-medium mb-1">Monthly Fee</label>
            <p className="text-xs text-gray-medium mb-2">Choose whether this package should include the admission fee</p>
            <div className="flex items-center justify-between bg-gray-50 border border-border-2 rounded-sm px-4 py-3">
              <span className="text-sm text-gray-medium">Monthly Amount</span>
              <span className="text-sm font-medium text-gray-medium">{monthlyAmount.toLocaleString()}.00</span>
            </div>
          </div>

          {/* Year Selection */}
          <div className="mb-4 print:hidden">
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-3 border border-border-2 rounded-sm appearance-none bg-white text-sm text-gray-medium focus:outline-none focus:border-purple"
              >
                <option>2024</option>
                <option>2025</option>
                <option>2026</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Month Selection with States */}
          <div className="grid grid-cols-4 gap-3 mb-6 print:hidden">
            {monthStates.map((monthState) => {
              const isSelected = selectedMonths.includes(monthState.name);
              const isPaid = monthState.status === "paid";
              const isDue = monthState.status === "due";
              
              return (
                <button
                  key={monthState.name}
                  onClick={() => toggleMonth(monthState.name, monthState.status)}
                  disabled={isPaid}
                  className={`flex items-center justify-center gap-2 px-2 py-2 rounded-sm border text-sm transition-colors ${
                    isPaid
                      ? "border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed"
                      : isSelected
                      ? "border-purple text-white bg-purple"
                      : isDue
                      ? "border-red-500 text-red-500 hover:bg-red-50"
                      : "border-border-2 text-gray-medium hover:bg-gray-50"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-xs border flex items-center justify-center ${
                    isPaid
                      ? "border-gray-300 bg-gray-200"
                      : isSelected
                      ? "border-white bg-white text-purple"
                      : isDue
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}>
                    {(isSelected || isPaid) && <Check className="w-3 h-3" />}
                  </div>
                  {monthState.name}
                </button>
              );
            })}
          </div>
          
          <div className="hidden print:block mb-4">
             <p className="text-sm"><strong>Months:</strong> {selectedMonths.join(", ")} {selectedYear}</p>
          </div>

          {/* Next Payment Date */}
          <div className="bg-gray-50 border border-border-2 rounded-sm px-4 py-3 mb-6 flex justify-between items-center print:bg-transparent print:border-0 print:p-0 print:mb-2">
            <span className="text-sm text-gray-medium">Next Payment Date</span>
            <span className="text-sm font-medium text-gray-medium">31/01/2026</span>
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
                  className="text-right h-8 text-sm border border-border-2 rounded-sm"
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
                  className="text-right h-8 text-sm border border-border-2 rounded-sm"
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
            <div className="bg-gray-50 border border-border-2 rounded-sm px-4 py-3 flex justify-between items-center">
              <span className="text-sm text-gray-medium">Payment Method</span>
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
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 bg-purple text-white rounded-lg text-sm font-medium hover:bg-purple/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </button>
            <button 
              onClick={handlePrint}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 bg-[#E25C3C] text-white rounded-lg text-sm font-medium hover:bg-[#E25C3C]/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
