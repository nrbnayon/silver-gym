// components/auth/AuthCard.tsx
import { ReactNode } from "react";

export default function AuthCard({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-orange-50 via-white to-orange-50/50 relative overflow-hidden">
      {/* Floating Blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-40" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-30" />

      <div className="w-full max-w-md">
        {/* Outer Card with Corner Borders Only */}
        <div className="relative bg-white rounded-3xl shadow-2xl p-1">
          <div className="absolute top-0 left-0 w-24 h-24 border-l-4 border-t-4 border-orange-200 rounded-tl-3xl" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-r-4 border-b-4 border-orange-200 rounded-br-3xl" />

          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-inner">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
