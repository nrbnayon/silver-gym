"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function DashboardNotFound() {
  const pathname = usePathname();
  const lastSegment = pathname.split("/").filter(Boolean).pop();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        {lastSegment
          ? `${lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)} Page`
          : "Page"}{" "}
        Under Development
      </h1>

      <p className="text-gray-600 mb-6">
        The page <span className="font-semibold text-gray-800">{pathname}</span>{" "}
        is currently under development.
      </p>

      <div className="flex gap-4">
        <Button asChild>
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
