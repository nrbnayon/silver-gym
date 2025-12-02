// components/modals/AddIncomeModal.tsx
"use client";

import { useState } from "react";
import { User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import Modal from "../ui/modal";
import { Member } from "@/types/member";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";

interface AddIncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  members: Member[];
}

export default function AddIncomeModal({
  isOpen,
  onClose,
  members,
}: AddIncomeModalProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.memberId.includes(searchQuery) ||
      member.phone.includes(searchQuery)
  );

  const handleMemberSelect = (member: Member) => {
    onClose();
    router.push(`/dashboard/income/create-bill/${member.id}`);
  };

  const handleClose = () => {
    setSearchQuery("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add Income"
      className="max-w-4xl"
    >
      <div>
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Search by User ID / Name / Phone Number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent h-12"
          />
        </div>

        {searchQuery === "" ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full text-gray-medium flex items-center justify-center">
              <HugeiconsIcon icon={Search01Icon} size={64} />
            </div>
            <h3 className="text-lg font-semibold text-gray-medium mb-2">
              Start Billing by Searching Records
            </h3>
            <p className="text-sm text-gray-500">
              Start typing a member&apos;s name, phone number or ID to quickly
              <br />
              find the right person and continue billing
            </p>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
              <HugeiconsIcon icon={Search01Icon} size={48} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Members Found
            </h3>
            <p className="text-sm text-gray-500 mb-1">
              We couldn&apos;t find any members matching &quot;{searchQuery}&quot;
            </p>
            <p className="text-xs text-gray-400">
              Try searching with a different name, phone number, or member ID
            </p>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            <div className="grid grid-cols-6 gap-4 px-4 py-2 text-xs font-semibold text-gray-600 border-b border-gray-200">
              <div className="col-span-2">Name</div>
              <div>Member ID</div>
              <div>Phone</div>
              <div>Status</div>
              <div>Payment</div>
            </div>
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                onClick={() => handleMemberSelect(member)}
                className="grid grid-cols-6 gap-4 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 items-center"
              >
                <div className="col-span-2 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-semibold overflow-hidden">
                    {member.profileImage ? (
                      <Image
                        src={member.profileImage}
                        alt={member.name}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      member.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {member.name}
                    </p>
                    <p className="text-xs text-gray-500">{member.email}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-700">{member.memberId}</div>
                <div className="text-sm text-gray-700">{member.phone}</div>
                <div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${
                      member.status === "Active"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {member.status}
                  </span>
                </div>
                <div>
                  <span
                    className={`text-xs font-medium ${
                      member.payment === "Complete"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {member.payment}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}


