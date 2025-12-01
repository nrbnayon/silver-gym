// app/dashboard/members/page.tsx
"use client";

import React, { useState, useMemo } from "react";
import MemberStatsCards from "@/components/dashboard/Members/MemberStatsCards";
import MemberTable from "@/components/dashboard/Members/MemberTable";
import SelectSMSTypeModal from "@/components/modals/SelectSMSTypeModal";
import {
  membersData,
  memberStatsData,
  filterMembersBySearch,
  filterMembersByStatus,
} from "@/data/memberData";
import { Member } from "@/types/member";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserAdd02Icon, Search01Icon, FilterIcon } from "@hugeicons/core-free-icons";

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string | null>(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [showSMSModal, setShowSMSModal] = useState(false);

  // Filter members based on search and filter
  const filteredMembers = useMemo(() => {
    let result = membersData;
    
    // Apply search filter
    result = filterMembersBySearch(result, searchQuery);
    
    // Apply status/payment filter
    result = filterMembersByStatus(result, filterType);
    
    return result;
  }, [searchQuery, filterType]);

  const handleSendSMS = (member: Member) => {
    setSelectedMember(member);
    setShowSMSModal(true);
  };

  const handleCloseSMSModal = () => {
    setShowSMSModal(false);
    setSelectedMember(null);
  };

  const handleFilterSelect = (type: string) => {
    setFilterType(type === filterType ? null : type);
    setShowFilterDropdown(false);
  };

  const handleManageClick = () => {
    console.log("Manage member form clicked");
    // TODO: Implement manage member form functionality
  };

  const handleAddMember = () => {
    console.log("Add new member clicked");
    // TODO: Implement add member functionality
  };

  return (
    <div className="min-h-screen">
      <div className="w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-1">
              Member Details
            </h1>
            <p className="text-sm text-gray-500">
              Effortlessly manage and oversee your organization's expenditure details.
            </p>
          </div>
          <button
            onClick={handleAddMember}
            className="px-4 py-2.5 bg-purple text-white text-sm rounded-md hover:bg-[#6A3FE0] transition-colors flex items-center justify-center gap-2 cursor-pointer md:text-base"
          >
            <HugeiconsIcon icon={UserAdd02Icon} size={20} />
            Add New Member
          </button>
        </div>

        {/* Stats Cards */}
        <MemberStatsCards stats={memberStatsData} onManageClick={handleManageClick} />

        {/* Member List Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          {/* Member List Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Member List</h2>
            
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 sm:flex-initial">
                <input
                  type="text"
                  placeholder="Search ID/Name/Title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <HugeiconsIcon
                  icon={Search01Icon}
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>

              {/* Filter */}
              <div className="relative">
                <button
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                    filterType
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <HugeiconsIcon icon={FilterIcon} size={18} />
                  Filter
                  {filterType && (
                    <span className="ml-1 w-2 h-2 bg-primary rounded-full"></span>
                  )}
                </button>

                {/* Filter Dropdown */}
                {showFilterDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="py-2">
                      <button
                        onClick={() => handleFilterSelect("active")}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                          filterType === "active" ? "bg-primary/5 text-primary" : "text-gray-700"
                        }`}
                      >
                        <HugeiconsIcon icon={UserAdd02Icon} size={18} />
                        Active Members
                        {filterType === "active" && (
                          <svg
                            className="ml-auto w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>
                      <button
                        onClick={() => handleFilterSelect("inactive")}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                          filterType === "inactive" ? "bg-primary/5 text-primary" : "text-gray-700"
                        }`}
                      >
                        <HugeiconsIcon icon={UserAdd02Icon} size={18} />
                        Inactive Members
                        {filterType === "inactive" && (
                          <svg
                            className="ml-auto w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>
                      <div className="border-t border-gray-200 my-2"></div>
                      <button
                        onClick={() => handleFilterSelect("complete")}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                          filterType === "complete" ? "bg-primary/5 text-primary" : "text-gray-700"
                        }`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Complete
                        {filterType === "complete" && (
                          <svg
                            className="ml-auto w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>
                      <button
                        onClick={() => handleFilterSelect("due")}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                          filterType === "due" ? "bg-primary/5 text-primary" : "text-gray-700"
                        }`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Due
                        {filterType === "due" && (
                          <svg
                            className="ml-auto w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Member Table */}
          <MemberTable members={filteredMembers} onSendSMS={handleSendSMS} />
        </div>

        {/* SMS Modal */}
        {selectedMember && (
          <SelectSMSTypeModal
            isOpen={showSMSModal}
            onClose={handleCloseSMSModal}
            memberName={selectedMember.name}
          />
        )}
      </div>
    </div>
  );
}
