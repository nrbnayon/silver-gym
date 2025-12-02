// app\dashboard\accounts\page.tsx
"use client";

import { useState } from "react";
import { BaseFeesSetup } from "@/components/accounts/BaseFeesSetup";
import { AddDetails } from "@/components/accounts/AddDetails";

export default function AccountsPage() {
  const [activeTab, setActiveTab] = useState<"package" | "expense">("package");

  return (
      <div className="min-h-screen">
        <div className="w-full space-y-6">
          {/* Base Fees Setup */}
          <BaseFeesSetup />

          {/* Add Details Section */}
          <AddDetails activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>
  );
}
