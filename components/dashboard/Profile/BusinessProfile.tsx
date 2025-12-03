"use client";

import { useState } from "react";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  PencilEdit02Icon, 
  PlusSignIcon
} from "@hugeicons/core-free-icons";
import { BusinessProfile as BusinessProfileType } from "@/types/profile";
import { toast } from "sonner";

interface BusinessProfileProps {
  initialData: BusinessProfileType;
}

export default function BusinessProfile({ initialData }: BusinessProfileProps) {
  const [data, setData] = useState<BusinessProfileType>(initialData);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState("");

  const handleEditClick = (field: keyof BusinessProfileType, value: any) => {
    setIsEditing(field);
    setTempValue(String(value || ""));
  };

  const handleSave = (field: keyof BusinessProfileType) => {
    setData({ ...data, [field]: tempValue });
    setIsEditing(null);
    toast.success("Business profile updated successfully");
  };

  const handleCancel = () => {
    setIsEditing(null);
    setTempValue("");
  };

  const renderEditableField = (
    label: string, 
    field: keyof BusinessProfileType, 
    value: string | undefined,
    placeholder: string = ""
  ) => {
    const isFieldEditing = isEditing === field;

    return (
      <div className="mb-6 last:mb-0">
        <label className="block text-sm text-gray-500 mb-1.5">{label}</label>
        <div className="relative">
          {isFieldEditing ? (
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
              />
              <button 
                onClick={() => handleSave(field)}
                className="px-3 py-2 bg-purple text-white rounded-lg text-sm whitespace-nowrap"
              >
                Save
              </button>
              <button 
                onClick={handleCancel}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm whitespace-nowrap"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between group">
              <p className="text-base text-gray-800 font-medium">{value || placeholder}</p>
              <button 
                onClick={() => handleEditClick(field, value)}
                className="text-gray-400 hover:text-purple transition-colors p-1 rounded-md hover:bg-purple/5"
              >
                <HugeiconsIcon icon={PencilEdit02Icon} size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Business Header */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-blue-500 flex items-center justify-center relative">
              {data.logo ? (
                <Image
                  src={data.logo}
                  alt={data.name}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              ) : (
                <span className="text-white text-2xl font-bold">{data.name.charAt(0)}</span>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{data.name}</h2>
              <p className="text-sm text-gray-500 mt-1">{data.email}</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-gray-50 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors">
            Upload Logo
          </button>
        </div>
      </div>

      {/* Professional Contact */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Professional Contact</h3>
        
        <div className="space-y-6">
          {renderEditableField("Phone number", "phone", data.phone)}
          {renderEditableField("E-mail", "businessEmail", data.businessEmail)}
          {renderEditableField("Company Address", "companyAddress", data.companyAddress)}
        </div>

        <div className="flex gap-3 mt-6">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            Add Address
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            Add age
          </button>
        </div>
      </div>

      {/* Address */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Address</h3>
        
        <div className="space-y-6">
          {renderEditableField("Country", "country", data.country)}
          {renderEditableField("Postal Code", "postalCode", data.postalCode)}
          {renderEditableField("City/State", "cityState", data.cityState)}
        </div>

        <div className="flex gap-3 mt-6">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            Add Postal Code
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            Add City/State
          </button>
        </div>
      </div>

      {/* Business Information */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Business Information</h3>
        
        <div className="space-y-6">
          {renderEditableField("Default Currency", "defaultCurrency", data.defaultCurrency)}
          {renderEditableField("Business Category", "businessCategory", data.businessCategory)}
          {renderEditableField("Registration / Trade License Number", "registrationNumber", data.registrationNumber)}
        </div>

        <div className="flex gap-3 mt-6">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            Add Registration / Trade License Number
          </button>
        </div>
      </div>
    </div>
  );
}
