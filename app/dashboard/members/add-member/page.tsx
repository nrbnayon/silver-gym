// app/dashboard/members/add-member/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  Upload04Icon,
} from "@hugeicons/core-free-icons";
import { toast } from "sonner";
import MemberActivitiesCalendar from "@/components/dashboard/Members/MemberActivitiesCalendar";

export default function AddMemberPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    emergencyContact: "",
    address: "",
    birthday: "",
    gender: "Male",
    nid: "",
    height: "",
    age: "",
    weight: "",
    trainingGoals: [] as string[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

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
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    validateField(fieldName);
  };

  const validateField = (fieldName: string) => {
    const newErrors: Record<string, string> = {};

    switch (fieldName) {
      case "name":
        if (!formData.name.trim()) {
          newErrors.name = "Full name is required";
        }
        break;
      case "email":
        if (!formData.email.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Please enter a valid email address";
        }
        break;
      case "phone":
        if (!formData.phone.trim()) {
          newErrors.phone = "Phone number is required";
        }
        break;
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    
    // Mark all required fields as touched
    setTouched({
      name: true,
      email: true,
      phone: true,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    try {
      // Here you would typically make an API call to create the member
      console.log("Creating member:", formData);
      toast.success("Member created successfully!", {
        description: `${formData.name} has been added to the members list`,
      });
      router.push("/dashboard/members");
    } catch (error) {
      console.error("Error creating member:", error);
      toast.error("Failed to create member", {
        description: "Please try again later",
      });
    }
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

  const getInputClassName = (fieldName: string) => {
    const baseClass = "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors";
    const hasError = touched[fieldName] && errors[fieldName];
    
    if (hasError) {
      return `${baseClass} border-red-500 focus:ring-red-500 bg-red-50`;
    }
    
    return `${baseClass} border-gray-300 focus:ring-purple`;
  };

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
            <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
              <span className="text-white text-2xl font-bold">?</span>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                New Member
              </h1>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 bg-gray-200 text-gray-600">
                Inactive
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2">
              <HugeiconsIcon icon={Upload04Icon} size={18} />
              Upload Profile
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Personal Contact & Training Goals */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Contact */}
            <div className="bg-white rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">
                  Personal Contact
                </h2>
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
                    className={getInputClassName("phone")}
                    placeholder="+880 1636-828200"
                  />
                  {touched.phone && errors.phone && (
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
                    placeholder="+880 1636-828200"
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
                    className={getInputClassName("email")}
                    placeholder="deanna.curtis@example.com"
                  />
                  {touched.email && errors.email && (
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
                    placeholder="33 Pendergast Aven e, GA, 30736"
                  />
                </div>

                {/* Full Name - REQUIRED (moved here for better UX) */}
                <div className="col-span-2">
                  <label className="block text-sm text-gray-500 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("name")}
                    className={getInputClassName("name")}
                    placeholder="Enter full name"
                  />
                  {touched.name && errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                  )}
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
                    placeholder="17 Sep 2000"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* NID */}
                <div>
                  <label className="block text-sm text-gray-500 mb-2">
                    NID
                  </label>
                  <input
                    type="text"
                    name="nid"
                    value={formData.nid}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
                    placeholder="1056484545"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
                    placeholder='5.10"'
                  />
                </div>

                {/* Age */}
                <div className="w-1/3">
                  <label className="block text-sm text-gray-500 mb-2">
                    Age
                  </label>
                  <input
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
                    placeholder="36"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
                    placeholder="68kg"
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
                      className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700">{goal}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-purple text-white rounded-md hover:bg-purple/90 transition-colors font-medium"
              >
                Create Member
              </button>
            </div>
          </div>

          {/* Right Column - Member Activities */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 sticky top-6">
              <MemberActivitiesCalendar />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
