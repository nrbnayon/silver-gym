// components/dashboard/Members/MemberTable.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Member } from "@/types/member";
import { HugeiconsIcon } from "@hugeicons/react";
import { MailSend01Icon, UserGroup02Icon } from "@hugeicons/core-free-icons";

interface MemberTableProps {
  members: Member[];
  onSendSMS: (member: Member) => void;
}

const MemberTable: React.FC<MemberTableProps> = ({ members, onSendSMS }) => {
  const router = useRouter();

  const handleRowClick = (memberId: string) => {
    router.push(`/dashboard/members/details/${memberId}`);
  };

  const handleSMSClick = (e: React.MouseEvent, member: Member) => {
    e.stopPropagation(); // Prevent row click when clicking SMS button
    onSendSMS(member);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden p-3">
      <div className="overflow-auto">
        <table className="w-full border-separate border-spacing-y-0.5 border border-border-2 rounded-lg px-2">
          <thead>
            <tr>
              <th className="px-6 py-4 text-left text-base font-semibold text-text-primary border-b">
                Name
              </th>
              <th className="px-6 py-4 text-left text-base font-semibold text-text-primary border-b">
                Member ID
              </th>
              <th className="px-6 py-4 text-left text-base font-semibold text-text-primary border-b">
                Phone
              </th>
              <th className="px-6 py-4 text-left text-base font-semibold text-text-primary border-b">
                Status
              </th>
              <th className="px-6 py-4 text-left text-base font-semibold text-text-primary border-b">
                Due Date
              </th>
              <th className="px-6 py-4 text-left text-base font-semibold text-text-primary border-b">
                Payment
              </th>
              <th className="px-6 py-4 text-center text-base font-semibold text-text-primary border-b">
                View
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 overflow-y-auto">
            {members.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  <HugeiconsIcon icon={UserGroup02Icon} size={24} />
                  No members found
                </td>
              </tr>
            ) : (
              members.map((member, index) => (
                <tr
                  key={member.id}
                  onClick={() => handleRowClick(member.id)}
                  className={`transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-primary"
                  } hover:bg-[#F2EEFF] rounded-md cursor-pointer `}
                >
                  {/* Name with Avatar & Email */}
                  <td className="px-6 py-4 text-sm rounded-l-md">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-gray-300 overflow-hidden flex items-center justify-center flex-shrink-0">
                        {member.profileImage || member.avatar ? (
                          <img
                            src={
                              member.profileImage ||
                              member.avatar ||
                              "/images/avatar.png"
                            }
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-white text-sm font-semibold">
                            {member.name.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-800">
                          {member.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {member.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Member ID */}
                  <td className="px-6 py-4 text-sm text-gray-medium">
                    {member.memberId}
                  </td>

                  {/* Phone */}
                  <td className="px-6 py-4 text-sm text-gray-medium">
                    {member.phone}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        member.status === "Active"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>

                  {/* Due Date */}
                  <td className="px-6 py-4 text-sm text-gray-medium">
                    {member.dueDate || "—"}
                  </td>

                  {/* Payment */}
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`font-medium ${
                        member.payment === "Complete"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {member.payment}
                    </span>
                  </td>

                  {/* View (SMS Icon) */}
                  <td className="px-6 py-4 text-center rounded-r-md">
                    <button
                      onClick={(e) => handleSMSClick(e, member)}
                      className="inline-flex items-center justify-center p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Send SMS"
                    >
                      <HugeiconsIcon
                        icon={MailSend01Icon}
                        size={20}
                        className="text-gray-600"
                      />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberTable;
