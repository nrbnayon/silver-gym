// app/dashboard/members/add-member/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AddMemberForm from "@/components/dashboard/Members/AddMemberForm";
import SuccessModal from "@/components/modals/SuccessModal";
import { toast } from "sonner";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";

interface AddMemberFormData {
  fullName: string;
  contact: string;
  dateOfBirth?: string;
  email?: string;
  emergencyContact?: string;
  nid?: string;
  height?: string;
  gender?: string;
  weight?: string;
  address?: string;
  trainingGoals?: string[];
}

export default function AddMemberPage() {
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [memberName, setMemberName] = useState("");

  const handleFormSubmit = async (formData: AddMemberFormData) => {
    try {
      // Simulate API call
      console.log("Adding new member:", formData);

      // Store member data (in a real app, this would be sent to the backend)
      setMemberName(formData.fullName);

      // Show success modal
      setShowSuccessModal(true);

      toast.success("Member added successfully!");
    } catch (error) {
      console.error("Error adding member:", error);
      toast.error("Failed to add member. Please try again.");
    }
  };

  const handleSuccessModalAction = () => {
    // Redirect back to members list
    router.push("/dashboard/members");
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleCancel}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} size={24} />
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                  Add New Member
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Create a new member profile with personal and fitness
                  information
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <AddMemberForm onSubmit={handleFormSubmit} onCancel={handleCancel} />
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onAction={handleSuccessModalAction}
        title="Member Added Successfully!"
        subtitle={`${memberName} has been added to your gym members list`}
        description="The new member can now access the gym facilities and you can manage their profile, billing, and activities from the dashboard."
        actionButtonText="View Members"
        autoRedirectSeconds={3}
        showCountdown={true}
      />
    </div>
  );
}
