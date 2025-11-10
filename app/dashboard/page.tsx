// app/dashboard/page.tsx
"use client";

import { useUser } from "@/hooks/useUser";
export default function DashboardPage() {
  const { user } = useUser();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome back, {user?.name || "User"}!
        </h1>
        <p className="text-gray-600">
          You are logged in as{" "}
          <span className="font-semibold capitalize">{user?.role}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Members</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">1,234</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-orange-500 text-2xl">👥</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Today</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">89</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-500 text-2xl">✓</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Monthly Income</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">$45K</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-500 text-2xl">💰</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pending Tasks</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">12</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-red-500 text-2xl">📋</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
