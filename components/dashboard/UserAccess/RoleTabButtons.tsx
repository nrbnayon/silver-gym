// components/dashboard/UserAccess/RoleTabButtons.tsx
// ============================================

import React from "react";

interface RoleTabButtonsProps {
  activeTab: "admin" | "manager";
  onTabChange: (tab: "admin" | "manager") => void;
}

const RoleTabButtons: React.FC<RoleTabButtonsProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="flex border-b">
      <button
        onClick={() => onTabChange("admin")}
        className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
          activeTab === "admin"
            ? "bg-[#7738F8] text-white"
            : "bg-white text-gray-600 hover:bg-gray-50"
        }`}
      >
        Admin
      </button>
      <button
        onClick={() => onTabChange("manager")}
        className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
          activeTab === "manager"
            ? "bg-[#7738F8] text-white"
            : "bg-white text-gray-600 hover:bg-gray-50"
        }`}
      >
        Manager
      </button>
    </div>
  );
};

export default RoleTabButtons;
