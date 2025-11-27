// app/(role)/manager/accounts/page.tsx
"use client";

import { useState } from "react";
import { CanAccess } from "@/components/shared/CanAccess";
import { BaseFeesSetup } from "@/components/accounts/BaseFeesSetup";
import { AddDetails } from "@/components/accounts/AddDetails";

export default function AccountsPage() {
  const [activeTab, setActiveTab] = useState<"package" | "expanse">("package");

  return (
    <CanAccess
      resource="access"
      action="view-users"
      fallback={
        <div className="p-6">You don&apos;t have access to Accounts</div>
      }
    >
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Base Fees Setup */}
          <BaseFeesSetup />

          {/* Add Details Section */}
          <AddDetails activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>
    </CanAccess>
  );
}
