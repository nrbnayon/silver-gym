// app/dashboard/members/details/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  PencilEdit02Icon,
  Upload04Icon,
} from "@hugeicons/core-free-icons";
import { toast } from "sonner";
import { membersData } from "@/data/memberData";
import { Member, PaymentRecord } from "@/types/member";
import DeactivateMemberModal from "@/components/modals/DeactivateMemberModal";
import PaymentHistoryTable from "@/components/dashboard/Members/PaymentHistoryTable";
import MemberActivitiesCalendar from "@/components/dashboard/Members/MemberActivitiesCalendar";

export default function MemberDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const memberId = params.id as string;

  const [member, setMember] = useState<Member | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState({
    phone: "",
    emergencyContact: "",
    email: "",
    address: "",
    birthday: "",
    gender: "",
    nid: "",
    height: "",
    age: "",
    weight: "",
    trainingGoals: [] as string[],
  });

  // Sample payment history data
  const [paymentHistory] = useState<PaymentRecord[]>([
    {
      id: "1",
      dateTime: "15 May 2020 8:00 pm",
      invoiceNo: "#INV9462",
      memberId: "38766940",
      month: "Jan",
      package: "Monthly",
      amount: "14,300",
    },
    {
      id: "2",
      dateTime: "12 Jun 2020 10:00 pm",
      invoiceNo: "#INV5620",
      memberId: "38766940",
      month: "Jun — Aug",
      package: "Quarterly Yearly",
      amount: "15,000",
    },
    {
      id: "3",
      dateTime: "02 Sep 2020 6:00 pm",
      invoiceNo: "#INV0483",
      memberId: "38766940",
      month: "Sep",
      package: "Monthly",
      amount: "15,000",
    },
    {
      id: "4",
      dateTime: "05 Oct 2020 5:00 pm",
      invoiceNo: "#INV0484",
      memberId: "38766940",
      month: "Oct — March",
      package: "Half-Yearly",
      amount: "22,000",
    },
  ]);

  useEffect(() => {
    // Find member by ID
    const foundMember = membersData.find((m) => m.id === memberId);
    if (foundMember) {
      setMember(foundMember);
      setFormData({
        phone: foundMember.phone || "",
        emergencyContact: "+880 1636-828200",
        email: foundMember.email || "",
        address: "33 Pendergast Aven e, GA, 30736",
        birthday: "17 Sep 2000",
        gender: "Male",
        nid: "1056484545",
        height: "5.10\"",
        age: "36",
        weight: "68kg",
        trainingGoals: ["Strength Training", "Cardio Endurance"],
      });
    } else {
      toast.error("Member not found");
      router.push("/dashboard/members");
    }
  }, [memberId, router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBlur = (fieldName: string) => {
    if (isEditMode) {
      setTouched((prev) => ({ ...prev, [fieldName]: true }));
      validateField(fieldName);
    }
  };

  const validateField = (fieldName: string) => {
    const newErrors: Record<string, string> = {};

    switch (fieldName) {
      case "phone":
        if (!formData.phone.trim()) {
          newErrors.phone = "Phone number is required";
        }
        break;
      case "email":
        if (!formData.email.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Please enter a valid email address";
        }
        break;
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    
    // Mark all required fields as touched
    setTouched({
      phone: true,
      email: true,
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleTrainingGoalToggle = (goal: string) => {
    setFormData((prev) => ({
      ...prev,
      trainingGoals: prev.trainingGoals.includes(goal)
        ? prev.trainingGoals.filter((g) => g !== goal)
        : [...prev.trainingGoals, goal],
    }));
  };

  const handleSave = () => {
    // Validate form before saving
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    try {
      // Here you would typically make an API call to update the member
      toast.success("Member updated successfully!", {
        description: "All changes have been saved",
      });
      setIsEditMode(false);
      // Clear errors and touched state
      setErrors({});
      setTouched({});
    } catch (error) {
      toast.error("Failed to update member", {
        description: "Please try again later",
      });
    }
  };

  const handleDeactivate = () => {
    try {
      // Here you would typically make an API call to deactivate the member
      if (member) {
        setMember({ ...member, status: "Inactive" });
        toast.success("Member deactivated successfully!");
        setShowDeactivateModal(false);
      }
    } catch (error) {
      toast.error("Failed to deactivate member");
    }
  };

  if (!member) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  const getInputClassName = (fieldName: string) => {
    const baseClass = "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors";
    const hasError = isEditMode && touched[fieldName] && errors[fieldName];
    
    if (hasError) {
      return `${baseClass} border-red-500 focus:ring-red-500 bg-red-50`;
    }
    
    if (isEditMode) {
      return `${baseClass} border-gray-300 focus:ring-purple`;
    }
    
    return `${baseClass} border-gray-300 focus:ring-purple disabled:bg-gray-50 disabled:text-gray-700`;
  };

  const trainingGoalOptions = [
    "Yoga",
    "Cardio Endurance",
    "Bodybuilding",
    "Muscle Gain",
    "Flexibility & Mobility",
    "General Fitness",
    "Strength Training",
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-4"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
          <span className="text-lg font-medium">Member Profile</span>
        </button>

        <div className="bg-white rounded-2xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center overflow-hidden">
              {member.profileImage ? (
                <img
                  src={member.profileImage}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white text-2xl font-bold">
                  {member.name.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                {member.name}
              </h1>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${
                  member.status === "Active"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {member.status}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-sm text-gray-500">ID: </span>
              <span className="text-sm font-medium text-gray-700">
                {member.memberId}
              </span>
            </div>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2">
              <HugeiconsIcon icon={Upload04Icon} size={18} />
              Upload Profile
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Personal Contact & Training Goals */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Contact */}
          <div className="bg-white rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Personal Contact
              </h2>
              {!isEditMode ? (
                <button
                  onClick={() => setIsEditMode(true)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <HugeiconsIcon
                    icon={PencilEdit02Icon}
                    size={20}
                    className="text-gray-600"
                  />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setIsEditMode(false);
                      setErrors({});
                      setTouched({});
                    }}
                    className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 text-sm bg-purple text-white rounded-md hover:bg-purple/90"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Phone number - REQUIRED */}
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Phone number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("phone")}
                  disabled={!isEditMode}
                  className={getInputClassName("phone")}
                />
                {isEditMode && touched.phone && errors.phone && (
                  <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                )}
              </div>

              {/* Emergency Contact */}
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Emergency Contact
                </label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple disabled:bg-gray-50 disabled:text-gray-700"
                />
              </div>

              {/* E-mail - REQUIRED */}
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  E-mail <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("email")}
                  disabled={!isEditMode}
                  className={getInputClassName("email")}
                />
                {isEditMode && touched.email && errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple disabled:bg-gray-50 disabled:text-gray-700"
                />
              </div>

              {/* Birthday */}
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Birthday
                </label>
                <input
                  type="text"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple disabled:bg-gray-50 disabled:text-gray-700"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple disabled:bg-gray-50 disabled:text-gray-700 bg-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* NID */}
              <div>
                <label className="block text-sm text-gray-500 mb-2">NID</label>
                <input
                  type="text"
                  name="nid"
                  value={formData.nid}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple disabled:bg-gray-50 disabled:text-gray-700"
                />
              </div>

              {/* Height */}
              <div className="w-1/3">
                <label className="block text-sm text-gray-500 mb-2">
                  Height
                </label>
                <input
                  type="text"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple disabled:bg-gray-50 disabled:text-gray-700"
                />
              </div>

              {/* Age */}
              <div className="w-1/3">
                <label className="block text-sm text-gray-500 mb-2">Age</label>
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple disabled:bg-gray-50 disabled:text-gray-700"
                />
              </div>

              {/* Weight */}
              <div className="w-1/3">
                <label className="block text-sm text-gray-500 mb-2">
                  Wight
                </label>
                <input
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple disabled:bg-gray-50 disabled:text-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Training Goals */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Training Goals
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {trainingGoalOptions.map((goal) => (
                <label
                  key={goal}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.trainingGoals.includes(goal)}
                    onChange={() => handleTrainingGoalToggle(goal)}
                    disabled={!isEditMode}
                    className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500 disabled:opacity-50"
                  />
                  <span className="text-sm text-gray-700">{goal}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Payment History */}
          <div className="bg-white rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Payment History
              </h2>
              <div className="text-right">
                <span className="text-sm text-gray-500">Total pay: </span>
                <span className="text-lg font-semibold text-gray-800">
                  2,52,000TK
                </span>
                <button className="ml-4 px-4 py-2 bg-purple text-white rounded-md hover:bg-purple/90 text-sm">
                  Collect Bill
                </button>
              </div>
            </div>
            <PaymentHistoryTable records={paymentHistory} />
          </div>
        </div>

        {/* Right Column - Member Activities */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 sticky top-6">
            <MemberActivitiesCalendar />
          </div>
        </div>
      </div>

      {/* Deactivate Button */}
      {member.status === "Active" && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setShowDeactivateModal(true)}
            className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Deactivate Member
          </button>
        </div>
      )}

      {/* Deactivate Modal */}
      <DeactivateMemberModal
        isOpen={showDeactivateModal}
        onClose={() => setShowDeactivateModal(false)}
        onConfirm={handleDeactivate}
        memberName={member.name}
      />
    </div>
  );
}