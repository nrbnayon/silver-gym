// components/accounts/AddDetails.tsx
"use client";

import { PackageTab } from "./tabs/PackageTab";
import { ExpanseTab } from "./tabs/ExpanseTab";

interface AddDetailsProps {
  activeTab: "package" | "expanse";
  setActiveTab: (tab: "package" | "expanse") => void;
}

export const AddDetails = ({ activeTab, setActiveTab }: AddDetailsProps) => {
  return (
    <div className="p-5 border-8 border-gray-secondary rounded-2xl space-y-4 shadow-none bg-white">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Add Details</h2>
      </div>

      {/* Tab Buttons */}
      <div className="flex p-2 bg-gray-primary rounded-lg mb-4 gap-4 ">
        <button
          onClick={() => setActiveTab("package")}
          className={`flex-1 px-6 py-3 text-center font-medium transition-colors cursor-pointer rounded-lg ${
            activeTab === "package"
              ? "bg-purple hover:bg-purple/90 text-white"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          Package
        </button>
        <button
          onClick={() => setActiveTab("expanse")}
          className={`flex-1 px-6 py-3 text-center font-medium transition-colors cursor-pointer rounded-lg ${
            activeTab === "expanse"
              ? "bg-purple hover:bg-purple/90 text-white"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          Expanse
        </button>
      </div>

      {/* Tab Content */}
      <div>{activeTab === "package" ? <PackageTab /> : <ExpanseTab />}</div>
    </div>
  );
};
