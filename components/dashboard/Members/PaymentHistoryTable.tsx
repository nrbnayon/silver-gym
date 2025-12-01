// components/dashboard/Members/PaymentHistoryTable.tsx
"use client";

import { PaymentRecord } from "@/types/member";

interface PaymentHistoryTableProps {
  records: PaymentRecord[];
}

const PaymentHistoryTable: React.FC<PaymentHistoryTableProps> = ({
  records,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
              Date & Time
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
              Invoice NO
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
              Member ID
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
              Month
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
              Package
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
              Amount
            </th>
            <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr
              key={record.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="px-4 py-4 text-sm text-gray-700">
                {record.dateTime}
              </td>
              <td className="px-4 py-4 text-sm text-gray-700">
                {record.invoiceNo}
              </td>
              <td className="px-4 py-4 text-sm text-gray-700">
                {record.memberId}
              </td>
              <td className="px-4 py-4 text-sm text-gray-700">
                {record.month}
              </td>
              <td className="px-4 py-4 text-sm text-gray-700">
                {record.package}
              </td>
              <td className="px-4 py-4 text-sm text-gray-700">
                {record.amount}
              </td>
              <td className="px-4 py-4 text-center">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistoryTable;
