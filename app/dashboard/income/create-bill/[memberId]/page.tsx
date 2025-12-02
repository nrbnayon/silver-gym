// app/dashboard/income/create-bill/[memberId]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { membersData } from "@/data/memberData";
import CreateBillForm from "@/components/dashboard/Income/CreateBillForm";
import { ArrowLeft } from "lucide-react";

export default function CreateBillPage() {
  const params = useParams();
  const router = useRouter();
  const memberId = params.memberId as string;

  // Find member by ID (using the internal id or memberId field depending on how we link it)
  // In a real app this would be an API call
  const member = membersData.find((m) => m.id === memberId || m.memberId === memberId);

  if (!member) {
    return (
      <div className="p-6">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          Member not found
        </div>
        <button
          onClick={() => router.back()}
          className="mt-4 flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Income List
        </button>
      </div>
      
      <CreateBillForm
        member={member}
        onCancel={() => router.back()}
        onSave={() => {
          console.log("Saved bill for", member.name);
          router.push("/dashboard/income");
        }}
      />
    </div>
  );
}
