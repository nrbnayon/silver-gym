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
    <div className="flex p-2 bg-gray-primary rounded-lg mb-3 gap-4">
      <button
        onClick={() => onTabChange("admin")}
        className={`flex-1 px-6 py-3 text-center font-medium transition-colors cursor-pointer rounded-lg ${
          activeTab === "admin"
            ? "bg-purple hover:bg-purple/90 text-white"
            : "bg-white text-gray-600 hover:bg-gray-50"
        }`}
      >
        Admin
      </button>
      <button
        onClick={() => onTabChange("manager")}
        className={`flex-1 px-6 py-3 text-center font-medium transition-colors cursor-pointer rounded-lg ${
          activeTab === "manager"
            ? "bg-purple hover:bg-purple/90 text-white"
            : "bg-white text-gray-600 hover:bg-gray-50"
        }`}
      >
        Manager
      </button>
    </div>
  );
};

export default RoleTabButtons;
