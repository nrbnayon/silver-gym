// components/dashboard/DashboardWrapper.tsx
"use client";

import { useState } from "react";
import DashboardHeader from "@/components/dashboard/Header/DashboardHeader";
import Sidebar from "@/components/dashboard/Sidebar/Sidebar";

export default function DashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-primary">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="md:pl-[280px]">
        <DashboardHeader
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />
        <main className="p-4 md:px-6 pt-24 md:pt-28 ">{children}</main>
      </div>
    </div>
  );
}
