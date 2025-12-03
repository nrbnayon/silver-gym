"use client";

import { useState } from "react";
import MyProfile from "@/components/dashboard/Profile/MyProfile";
import BusinessProfile from "@/components/dashboard/Profile/BusinessProfile";
import { defaultUserProfile, defaultBusinessProfile } from "@/data/profileData";
import { cn } from "@/lib/utils";

type TabType = "my-profile" | "business-profile" | "subscription" | "invoice";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>("my-profile");

  const tabs = [
    { id: "my-profile", label: "My Profile" },
    { id: "business-profile", label: "Business Profile" },
    { id: "subscription", label: "Subscription" },
    { id: "invoice", label: "Invoice Details" },
  ];

  return (
    <div className="min-h-screen pb-10">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Sidebar Navigation */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-2xl p-4 border border-gray-100 sticky top-24">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
              General Settings
            </h2>
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={cn(
                    "w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    activeTab === tab.id
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 max-w-4xl">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {tabs.find((t) => t.id === activeTab)?.label}
          </h1>

          {activeTab === "my-profile" && (
            <MyProfile initialData={defaultUserProfile} />
          )}

          {activeTab === "business-profile" && (
            <BusinessProfile initialData={defaultBusinessProfile} />
          )}

          {(activeTab === "subscription" || activeTab === "invoice") && (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚧</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Coming Soon</h3>
              <p className="text-gray-500">This section is currently under development.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
